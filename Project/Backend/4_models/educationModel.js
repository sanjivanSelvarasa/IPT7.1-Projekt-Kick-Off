const sql = require('mssql')

const database = require('./database')

async function getEducationsByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                id,
                portfolio_id AS portfolioId,
                institution_name AS institutionName,
                degree,
                field_of_study AS fieldOfStudy,
                sort_order AS sortOrder,
                [start_date] AS startDate,
                end_date AS endDate,
                created_at AS createdAt
            FROM Education
            WHERE portfolio_id = @portfolioId
            ORDER BY
                CASE WHEN sort_order IS NULL THEN 1 ELSE 0 END,
                sort_order ASC,
                id DESC
        `)

    return result.recordset
}

async function getEducationById(educationId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('educationId', sql.Int, educationId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                institution_name AS institutionName,
                degree,
                field_of_study AS fieldOfStudy,
                sort_order AS sortOrder,
                [start_date] AS startDate,
                end_date AS endDate,
                created_at AS createdAt
            FROM Education
            WHERE id = @educationId
        `)

    return result.recordset[0]
}

async function createEducationForPortfolio(portfolioId, education) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('institutionName', sql.NVarChar(100), education.institutionName)
        .input('degree', sql.NVarChar(100), education.degree)
        .input('fieldOfStudy', sql.NVarChar(100), education.fieldOfStudy)
        .input('sortOrder', sql.Int, education.sortOrder)
        .input('startDate', sql.Date, education.startDate)
        .input('endDate', sql.Date, education.endDate)
        .query(`
            INSERT INTO Education (
                portfolio_id,
                institution_name,
                degree,
                field_of_study,
                sort_order,
                [start_date],
                end_date,
                created_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.institution_name AS institutionName,
                inserted.degree,
                inserted.field_of_study AS fieldOfStudy,
                inserted.sort_order AS sortOrder,
                inserted.[start_date] AS startDate,
                inserted.end_date AS endDate,
                inserted.created_at AS createdAt
            VALUES (
                @portfolioId,
                @institutionName,
                @degree,
                @fieldOfStudy,
                @sortOrder,
                @startDate,
                @endDate,
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateEducation(educationId, education) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('educationId', sql.Int, educationId)
        .input('institutionName', sql.NVarChar(100), education.institutionName)
        .input('degree', sql.NVarChar(100), education.degree)
        .input('fieldOfStudy', sql.NVarChar(100), education.fieldOfStudy)
        .input('sortOrder', sql.Int, education.sortOrder)
        .input('startDate', sql.Date, education.startDate)
        .input('endDate', sql.Date, education.endDate)
        .query(`
            UPDATE Education
            SET
                institution_name = @institutionName,
                degree = @degree,
                field_of_study = @fieldOfStudy,
                sort_order = @sortOrder,
                [start_date] = @startDate,
                end_date = @endDate
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.institution_name AS institutionName,
                inserted.degree,
                inserted.field_of_study AS fieldOfStudy,
                inserted.sort_order AS sortOrder,
                inserted.[start_date] AS startDate,
                inserted.end_date AS endDate,
                inserted.created_at AS createdAt
            WHERE id = @educationId
        `)

    return result.recordset[0]
}

async function deleteEducationById(educationId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('educationId', sql.Int, educationId)
        .query('DELETE FROM Education WHERE id = @educationId')
}

module.exports = {
    getEducationsByPortfolioId,
    getEducationById,
    createEducationForPortfolio,
    updateEducation,
    deleteEducationById
}
