#!/bin/bash
set -euo pipefail

DB_NAME="CreateYourselfDB"
SA_PASSWORD="${MSSQL_SA_PASSWORD:-${SQLCMDPASSWORD:-}}"
SQLCMD_BIN="/opt/mssql-tools18/bin/sqlcmd"

if [[ -z "${SA_PASSWORD}" ]]; then
    echo "Missing MSSQL_SA_PASSWORD or SQLCMDPASSWORD for database initialization." >&2
    exit 1
fi

SQLCMD=("${SQLCMD_BIN}" -S database -U sa -P "${SA_PASSWORD}" -C -b)

sqlcmd_run() {
    "${SQLCMD[@]}" "$@"
}

sqlcmd_scalar() {
    # Returns a single trimmed scalar value from SQL Server output.
    sqlcmd_run -h -1 -W "$@" | tr -d '\r' | sed '/^$/d' | head -n 1
}

wait_for_sql_server() {
    echo "Waiting for SQL Server to become available..."
    until sqlcmd_run -Q "SELECT 1" >/dev/null 2>&1; do
        sleep 2
    done
}

wait_for_database_online() {
    local db_name="$1"
    echo "Waiting for database ${db_name} to become online..."

    until [[ "$(sqlcmd_scalar -Q "SET NOCOUNT ON; SELECT state_desc FROM sys.databases WHERE name = '${db_name}'")" == "ONLINE" ]]; do
        sleep 2
    done
}

recreate_database() {
    local db_name="$1"
    sqlcmd_run -d master -Q "ALTER DATABASE [${db_name}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE; DROP DATABASE [${db_name}]; CREATE DATABASE [${db_name}]"
}

wait_for_sql_server

echo "Ensuring database ${DB_NAME} exists..."
sqlcmd_run -Q "IF DB_ID('${DB_NAME}') IS NULL BEGIN CREATE DATABASE [${DB_NAME}] END"
wait_for_database_online "${DB_NAME}"

echo "Checking for legacy schema drift..."
LEGACY_SCHEMA="$(sqlcmd_scalar -d "${DB_NAME}" -Q "SET NOCOUNT ON;
IF OBJECT_ID('dbo.Portfolio', 'U') IS NOT NULL
   AND (
       COL_LENGTH('dbo.Portfolio', 'current_theme_id') IS NULL
       OR COL_LENGTH('dbo.Portfolio', 'current_version_id') IS NULL
       OR COL_LENGTH('dbo.Portfolio', 'description') IS NULL
       OR COL_LENGTH('dbo.Project', 'description') IS NULL
       OR COL_LENGTH('dbo.Skill', 'description') IS NULL
       OR COL_LENGTH('dbo.Experience', 'description') IS NULL
   )
    SELECT '1'
ELSE
    SELECT '0'")"

if [[ "${LEGACY_SCHEMA}" == "1" ]]; then
    echo "Legacy schema detected. Recreating ${DB_NAME} so the current schema can be applied cleanly."
    recreate_database "${DB_NAME}"
    wait_for_database_online "${DB_NAME}"
fi

echo "Checking whether schema is already initialized..."
if [[ "$(sqlcmd_scalar -d "${DB_NAME}" -Q "SET NOCOUNT ON; SELECT TOP 1 1 FROM sys.tables WHERE name = 'UserRefreshToken'")" == "1" ]]; then
    exit 0
fi

echo "Applying schema initialization script..."
sqlcmd_run -i /init/CreateYourselfDB.sql

echo "Verifying schema initialization..."
sqlcmd_run -d "${DB_NAME}" -Q "IF OBJECT_ID('dbo.UserRefreshToken', 'U') IS NULL BEGIN THROW 50000, 'Schema initialization failed.', 1 END"