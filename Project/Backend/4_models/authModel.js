const sql = require('mssql')

const database = require('./database')

async function getUsers() {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .query('SELECT email FROM [User] ORDER BY id ASC')

    return result.recordset
}

async function addUser(user) {
    const pool = await database.getPool()

    await pool
        .request()
        .input('username', sql.NVarChar(50), user.username)
        .input('email', sql.NVarChar(100), user.email)
        .input('passwordHash', sql.NVarChar(255), user.passwordHash)
        .query(`
            INSERT INTO [User] (
                username,
                email,
                password_hash,
                created_at,
                updated_at
            )
            VALUES (
                @username,
                @email,
                @passwordHash,
                SYSUTCDATETIME(),
                SYSUTCDATETIME()
            )
        `)
}

async function findUserByEmail(email) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('email', sql.NVarChar(100), email)
        .query(`
            SELECT TOP 1
                id,
                username,
                email,
                password_hash AS passwordHash
            FROM [User]
            WHERE LOWER(email) = LOWER(@email)
        `)

    return result.recordset[0]
}

async function hasUserWithEmail(email) {
    return Boolean(await findUserByEmail(email))
}

async function addRefreshToken(token, userId) {
    const pool = await database.getPool()

    await pool
        .request()
        .input('token', sql.NVarChar(2048), token)
        .input('userId', sql.Int, userId)
        .query(`
            INSERT INTO UserRefreshToken (
                user_id,
                token,
                created_at
            )
            VALUES (
                @userId,
                @token,
                SYSUTCDATETIME()
            )
        `)
}

async function hasRefreshToken(token) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('token', sql.NVarChar(2048), token)
        .query('SELECT TOP 1 id FROM UserRefreshToken WHERE token = @token')

    return result.recordset.length > 0
}

async function removeRefreshToken(token) {
    const pool = await database.getPool()

    await pool
        .request()
        .input('token', sql.NVarChar(2048), token)
        .query('DELETE FROM UserRefreshToken WHERE token = @token')
}

module.exports = {
    getUsers,
    addUser,
    findUserByEmail,
    hasUserWithEmail,
    addRefreshToken,
    hasRefreshToken,
    removeRefreshToken
}
