const sql = require('mssql')

const database = require('./database')

async function findUserByEmail(email) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('email', sql.NVarChar(100), email)
        .query(`
            SELECT TOP 1
                id,
                email
            FROM [User]
            WHERE LOWER(email) = LOWER(@email)
        `)

    return result.recordset[0]
}

async function getPortfoliosByUserId(userId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .query(`
            SELECT
                id,
                title,
                [desc] AS description,
                slug,
                visibility,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM Portfolio
            WHERE [user_id] = @userId
            ORDER BY id DESC
        `)

    return result.recordset
}

async function createPortfolioForUser(userId, portfolio) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .input('title', sql.NVarChar(100), portfolio.title)
        .input('description', sql.NVarChar(sql.MAX), portfolio.description)
        .input('slug', sql.NVarChar(100), portfolio.slug)
        .input('visibility', sql.NVarChar(20), portfolio.visibility)
        .query(`
            INSERT INTO Portfolio (
                [user_id],
                template_id,
                title,
                [desc],
                slug,
                visibility,
                created_at,
                updated_at
            )
            OUTPUT
                inserted.id,
                inserted.[user_id] AS userId,
                inserted.title,
                inserted.[desc] AS description,
                inserted.slug,
                inserted.visibility,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            VALUES (
                @userId,
                NULL,
                @title,
                @description,
                @slug,
                @visibility,
                SYSUTCDATETIME(),
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function getPortfolioById(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT TOP 1
                id,
                [user_id] AS userId,
                title,
                [desc] AS description,
                slug,
                visibility,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM Portfolio
            WHERE id = @portfolioId
        `)

    return result.recordset[0]
}

async function updatePortfolio(portfolioId, portfolio) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('title', sql.NVarChar(100), portfolio.title)
        .input('description', sql.NVarChar(sql.MAX), portfolio.description)
        .input('slug', sql.NVarChar(100), portfolio.slug)
        .input('visibility', sql.NVarChar(20), portfolio.visibility)
        .query(`
            UPDATE Portfolio
            SET
                title = @title,
                [desc] = @description,
                slug = @slug,
                visibility = @visibility,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.[user_id] AS userId,
                inserted.title,
                inserted.[desc] AS description,
                inserted.slug,
                inserted.visibility,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            WHERE id = @portfolioId
        `)

    return result.recordset[0]
}

async function deletePortfolioById(portfolioId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query('DELETE FROM Portfolio WHERE id = @portfolioId')
}

module.exports = {
    findUserByEmail,
    getPortfoliosByUserId,
    createPortfolioForUser,
    getPortfolioById,
    updatePortfolio,
    deletePortfolioById
}
