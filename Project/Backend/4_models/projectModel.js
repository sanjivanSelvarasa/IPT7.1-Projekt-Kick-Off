const sql = require('mssql')

const database = require('./database')

async function getProjectsByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                id,
                portfolio_id AS portfolioId,
                title,
                description,
                sort_order AS sortOrder,
                img_url AS imageUrl,
                project_url AS projectUrl,
                github_url AS githubUrl,
                [start_date] AS startDate,
                end_date AS endDate,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM Project
            WHERE portfolio_id = @portfolioId
            ORDER BY
                CASE WHEN sort_order IS NULL THEN 1 ELSE 0 END,
                sort_order ASC,
                id DESC
        `)

    return result.recordset
}

async function getProjectById(projectId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('projectId', sql.Int, projectId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                title,
                description,
                sort_order AS sortOrder,
                img_url AS imageUrl,
                project_url AS projectUrl,
                github_url AS githubUrl,
                [start_date] AS startDate,
                end_date AS endDate,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM Project
            WHERE id = @projectId
        `)

    return result.recordset[0]
}

async function createProjectForPortfolio(portfolioId, project) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('title', sql.NVarChar(100), project.title)
        .input('description', sql.NVarChar(sql.MAX), project.description)
        .input('sortOrder', sql.Int, project.sortOrder)
        .input('imageUrl', sql.NVarChar(255), project.imageUrl)
        .input('projectUrl', sql.NVarChar(255), project.projectUrl)
        .input('githubUrl', sql.NVarChar(255), project.githubUrl)
        .input('startDate', sql.Date, project.startDate)
        .input('endDate', sql.Date, project.endDate)
        .query(`
            INSERT INTO Project (
                portfolio_id,
                title,
                description,
                sort_order,
                img_url,
                project_url,
                github_url,
                [start_date],
                end_date,
                created_at,
                updated_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.title,
                inserted.description,
                inserted.sort_order AS sortOrder,
                inserted.img_url AS imageUrl,
                inserted.project_url AS projectUrl,
                inserted.github_url AS githubUrl,
                inserted.[start_date] AS startDate,
                inserted.end_date AS endDate,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            VALUES (
                @portfolioId,
                @title,
                @description,
                @sortOrder,
                @imageUrl,
                @projectUrl,
                @githubUrl,
                @startDate,
                @endDate,
                SYSUTCDATETIME(),
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateProject(projectId, project) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('projectId', sql.Int, projectId)
        .input('title', sql.NVarChar(100), project.title)
        .input('description', sql.NVarChar(sql.MAX), project.description)
        .input('sortOrder', sql.Int, project.sortOrder)
        .input('imageUrl', sql.NVarChar(255), project.imageUrl)
        .input('projectUrl', sql.NVarChar(255), project.projectUrl)
        .input('githubUrl', sql.NVarChar(255), project.githubUrl)
        .input('startDate', sql.Date, project.startDate)
        .input('endDate', sql.Date, project.endDate)
        .query(`
            UPDATE Project
            SET
                title = @title,
                description = @description,
                sort_order = @sortOrder,
                img_url = @imageUrl,
                project_url = @projectUrl,
                github_url = @githubUrl,
                [start_date] = @startDate,
                end_date = @endDate,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.title,
                inserted.description,
                inserted.sort_order AS sortOrder,
                inserted.img_url AS imageUrl,
                inserted.project_url AS projectUrl,
                inserted.github_url AS githubUrl,
                inserted.[start_date] AS startDate,
                inserted.end_date AS endDate,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            WHERE id = @projectId
        `)

    return result.recordset[0]
}

async function deleteProjectById(projectId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('projectId', sql.Int, projectId)
        .query('DELETE FROM Project WHERE id = @projectId')
}

async function updateProjectImageUrl(projectId, imageUrl) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('projectId', sql.Int, projectId)
        .input('imageUrl', sql.NVarChar(255), imageUrl)
        .query(`
            UPDATE Project
            SET
                img_url = @imageUrl,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.img_url AS imageUrl,
                inserted.updated_at AS updatedAt
            WHERE id = @projectId
        `)

    return result.recordset[0]
}

module.exports = {
    getProjectsByPortfolioId,
    getProjectById,
    createProjectForPortfolio,
    updateProject,
    deleteProjectById,
    updateProjectImageUrl
}
