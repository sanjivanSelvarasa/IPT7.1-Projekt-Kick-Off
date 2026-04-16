const sql = require('mssql')

const database = require('./database')

async function getSocialLinksByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                id,
                portfolio_id AS portfolioId,
                [platform] AS platform,
                [url] AS url,
                created_at AS createdAt
            FROM SocialLink
            WHERE portfolio_id = @portfolioId
            ORDER BY id DESC
        `)

    return result.recordset
}

async function getSocialLinkById(linkId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('linkId', sql.Int, linkId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                [platform] AS platform,
                [url] AS url,
                created_at AS createdAt
            FROM SocialLink
            WHERE id = @linkId
        `)

    return result.recordset[0]
}

async function createSocialLinkForPortfolio(portfolioId, link) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('platform', sql.NVarChar(50), link.platform)
        .input('url', sql.NVarChar(255), link.url)
        .query(`
            INSERT INTO SocialLink (
                portfolio_id,
                [platform],
                [url],
                created_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.[platform] AS platform,
                inserted.[url] AS url,
                inserted.created_at AS createdAt
            VALUES (
                @portfolioId,
                @platform,
                @url,
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateSocialLink(linkId, link) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('linkId', sql.Int, linkId)
        .input('platform', sql.NVarChar(50), link.platform)
        .input('url', sql.NVarChar(255), link.url)
        .query(`
            UPDATE SocialLink
            SET
                [platform] = @platform,
                [url] = @url
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.[platform] AS platform,
                inserted.[url] AS url,
                inserted.created_at AS createdAt
            WHERE id = @linkId
        `)

    return result.recordset[0]
}

async function deleteSocialLinkById(linkId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('linkId', sql.Int, linkId)
        .query('DELETE FROM SocialLink WHERE id = @linkId')
}

module.exports = {
    getSocialLinksByPortfolioId,
    getSocialLinkById,
    createSocialLinkForPortfolio,
    updateSocialLink,
    deleteSocialLinkById
}
