#!/bin/bash
set -euo pipefail

SQLCMD="/opt/mssql-tools18/bin/sqlcmd -S database -U sa -P ${MSSQL_SA_PASSWORD} -C"

echo "Waiting for SQL Server to become available..."
until $SQLCMD -Q "SELECT 1" >/dev/null 2>&1; do
    sleep 2
done

$SQLCMD -Q "IF DB_ID('CreateYourselfDB') IS NULL BEGIN CREATE DATABASE CreateYourselfDB END"

# Exit early if schema is already initialized.
if $SQLCMD -d CreateYourselfDB -h -1 -W -Q "SET NOCOUNT ON; SELECT 1 FROM sys.tables WHERE name = 'UserRefreshToken'" | grep -qx "1"; then
    exit 0
fi

$SQLCMD -i /init/CreateYourselfDB.sql