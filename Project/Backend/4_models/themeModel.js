const sql = require('mssql')

const database = require('./database')

async function getThemesByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                t.id,
                t.portfolio_id AS portfolioId,
                t.primary_color AS primaryColor,
                t.secondary_color AS secondaryColor,
                t.background_color AS backgroundColor,
                t.surface_color AS surfaceColor,
                t.text_color AS textColor,
                t.accent_color AS accentColor,
                t.font_family AS fontFamily,
                t.created_at AS createdAt,
                t.updated_at AS updatedAt,
                CAST(CASE WHEN p.current_theme_id = t.id THEN 1 ELSE 0 END AS bit) AS isActive
            FROM Theme t
            INNER JOIN Portfolio p ON p.id = t.portfolio_id
            WHERE t.portfolio_id = @portfolioId
            ORDER BY
                CASE WHEN p.current_theme_id = t.id THEN 0 ELSE 1 END,
                t.id DESC
        `)

    return result.recordset
}

async function getThemeById(themeId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('themeId', sql.Int, themeId)
        .query(`
            SELECT TOP 1
                t.id,
                t.portfolio_id AS portfolioId,
                t.primary_color AS primaryColor,
                t.secondary_color AS secondaryColor,
                t.background_color AS backgroundColor,
                t.surface_color AS surfaceColor,
                t.text_color AS textColor,
                t.accent_color AS accentColor,
                t.font_family AS fontFamily,
                t.created_at AS createdAt,
                t.updated_at AS updatedAt
            FROM Theme t
            WHERE t.id = @themeId
        `)

    return result.recordset[0]
}

async function createThemeForPortfolio(portfolioId, theme) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('primaryColor', sql.NVarChar(20), theme.primaryColor)
        .input('secondaryColor', sql.NVarChar(20), theme.secondaryColor)
        .input('backgroundColor', sql.NVarChar(20), theme.backgroundColor)
        .input('surfaceColor', sql.NVarChar(20), theme.surfaceColor)
        .input('textColor', sql.NVarChar(20), theme.textColor)
        .input('accentColor', sql.NVarChar(20), theme.accentColor)
        .input('fontFamily', sql.NVarChar(100), theme.fontFamily)
        .query(`
            INSERT INTO Theme (
                portfolio_id,
                primary_color,
                secondary_color,
                background_color,
                surface_color,
                text_color,
                accent_color,
                font_family,
                created_at,
                updated_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.primary_color AS primaryColor,
                inserted.secondary_color AS secondaryColor,
                inserted.background_color AS backgroundColor,
                inserted.surface_color AS surfaceColor,
                inserted.text_color AS textColor,
                inserted.accent_color AS accentColor,
                inserted.font_family AS fontFamily,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            VALUES (
                @portfolioId,
                @primaryColor,
                @secondaryColor,
                @backgroundColor,
                @surfaceColor,
                @textColor,
                @accentColor,
                @fontFamily,
                SYSUTCDATETIME(),
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateTheme(themeId, theme) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('themeId', sql.Int, themeId)
        .input('primaryColor', sql.NVarChar(20), theme.primaryColor)
        .input('secondaryColor', sql.NVarChar(20), theme.secondaryColor)
        .input('backgroundColor', sql.NVarChar(20), theme.backgroundColor)
        .input('surfaceColor', sql.NVarChar(20), theme.surfaceColor)
        .input('textColor', sql.NVarChar(20), theme.textColor)
        .input('accentColor', sql.NVarChar(20), theme.accentColor)
        .input('fontFamily', sql.NVarChar(100), theme.fontFamily)
        .query(`
            UPDATE Theme
            SET
                primary_color = @primaryColor,
                secondary_color = @secondaryColor,
                background_color = @backgroundColor,
                surface_color = @surfaceColor,
                text_color = @textColor,
                accent_color = @accentColor,
                font_family = @fontFamily,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.primary_color AS primaryColor,
                inserted.secondary_color AS secondaryColor,
                inserted.background_color AS backgroundColor,
                inserted.surface_color AS surfaceColor,
                inserted.text_color AS textColor,
                inserted.accent_color AS accentColor,
                inserted.font_family AS fontFamily,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            WHERE id = @themeId
        `)

    return result.recordset[0]
}

async function setCurrentThemeForPortfolio(portfolioId, themeId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('themeId', sql.Int, themeId)
        .query(`
            UPDATE Portfolio
            SET
                current_theme_id = @themeId,
                updated_at = SYSUTCDATETIME()
            WHERE id = @portfolioId
        `)
}

async function clearCurrentThemeIfMatching(portfolioId, themeId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('themeId', sql.Int, themeId)
        .query(`
            UPDATE Portfolio
            SET
                current_theme_id = NULL,
                updated_at = SYSUTCDATETIME()
            WHERE id = @portfolioId
              AND current_theme_id = @themeId
        `)
}

async function deleteThemeById(themeId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('themeId', sql.Int, themeId)
        .query('DELETE FROM Theme WHERE id = @themeId')
}

module.exports = {
    getThemesByPortfolioId,
    getThemeById,
    createThemeForPortfolio,
    updateTheme,
    setCurrentThemeForPortfolio,
    clearCurrentThemeIfMatching,
    deleteThemeById
}
