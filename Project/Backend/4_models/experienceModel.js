const sql = require('mssql')

const database = require('./database')

async function getExperiencesByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                id,
                portfolio_id AS portfolioId,
                company_name AS companyName,
                position,
                sort_order AS sortOrder,
                description,
                [start_date] AS startDate,
                end_date AS endDate,
                created_at AS createdAt
            FROM Experience
            WHERE portfolio_id = @portfolioId
            ORDER BY
                CASE WHEN sort_order IS NULL THEN 1 ELSE 0 END,
                sort_order ASC,
                id DESC
        `)

    return result.recordset
}

async function getExperienceById(experienceId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('experienceId', sql.Int, experienceId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                company_name AS companyName,
                position,
                sort_order AS sortOrder,
                description,
                [start_date] AS startDate,
                end_date AS endDate,
                created_at AS createdAt
            FROM Experience
            WHERE id = @experienceId
        `)

    return result.recordset[0]
}

async function createExperienceForPortfolio(portfolioId, experience) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('companyName', sql.NVarChar(100), experience.companyName)
        .input('position', sql.NVarChar(100), experience.position)
        .input('sortOrder', sql.Int, experience.sortOrder)
        .input('description', sql.NVarChar(sql.MAX), experience.description)
        .input('startDate', sql.Date, experience.startDate)
        .input('endDate', sql.Date, experience.endDate)
        .query(`
            INSERT INTO Experience (
                portfolio_id,
                company_name,
                position,
            sort_order,
                description,
                [start_date],
                end_date,
                created_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.company_name AS companyName,
                inserted.position,
                inserted.sort_order AS sortOrder,
                inserted.description,
                inserted.[start_date] AS startDate,
                inserted.end_date AS endDate,
                inserted.created_at AS createdAt
            VALUES (
                @portfolioId,
                @companyName,
                @position,
                @sortOrder,
                @description,
                @startDate,
                @endDate,
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateExperience(experienceId, experience) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('experienceId', sql.Int, experienceId)
        .input('companyName', sql.NVarChar(100), experience.companyName)
        .input('position', sql.NVarChar(100), experience.position)
        .input('sortOrder', sql.Int, experience.sortOrder)
        .input('description', sql.NVarChar(sql.MAX), experience.description)
        .input('startDate', sql.Date, experience.startDate)
        .input('endDate', sql.Date, experience.endDate)
        .query(`
            UPDATE Experience
            SET
                company_name = @companyName,
                position = @position,
                sort_order = @sortOrder,
                description = @description,
                [start_date] = @startDate,
                end_date = @endDate
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.company_name AS companyName,
                inserted.position,
                inserted.sort_order AS sortOrder,
                inserted.description,
                inserted.[start_date] AS startDate,
                inserted.end_date AS endDate,
                inserted.created_at AS createdAt
            WHERE id = @experienceId
        `)

    return result.recordset[0]
}

async function deleteExperienceById(experienceId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('experienceId', sql.Int, experienceId)
        .query('DELETE FROM Experience WHERE id = @experienceId')
}

module.exports = {
    getExperiencesByPortfolioId,
    getExperienceById,
    createExperienceForPortfolio,
    updateExperience,
    deleteExperienceById
}
