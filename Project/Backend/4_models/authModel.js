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

async function findUserByUsername(username) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('username', sql.NVarChar(50), username)
        .query(`
            SELECT TOP 1
                id,
                username,
                email
            FROM [User]
            WHERE LOWER(username) = LOWER(@username)
        `)

    return result.recordset[0]
}

async function hasUserWithUsername(username) {
    return Boolean(await findUserByUsername(username))
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
                token_hash,
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
        .query('SELECT TOP 1 id FROM UserRefreshToken WHERE token_hash = @token')

    return result.recordset.length > 0
}

async function removeRefreshToken(token) {
    const pool = await database.getPool()

    await pool
        .request()
        .input('token', sql.NVarChar(2048), token)
    .query('DELETE FROM UserRefreshToken WHERE token_hash = @token')
}

async function removeRefreshTokensByUserId(userId) {
    const pool = await database.getPool()

    await pool
        .request()
        .input('userId', sql.Int, userId)
        .query('DELETE FROM UserRefreshToken WHERE user_id = @userId')
}

module.exports = {
    getUsers,
    addUser,
    findUserByEmail,
    hasUserWithEmail,
    findUserByUsername,
    hasUserWithUsername,
    addRefreshToken,
    hasRefreshToken,
    removeRefreshToken,
    removeRefreshTokensByUserId
}
