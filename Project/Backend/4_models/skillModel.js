const sql = require('mssql')

const database = require('./database')

async function findSkillByName(name) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('name', sql.NVarChar(50), name)
        .query(`
            SELECT TOP 1
                id,
                [name] AS name,
                [desc] AS description,
                created_at AS createdAt
            FROM Skill
            WHERE LOWER([name]) = LOWER(@name)
        `)

    return result.recordset[0]
}

async function createSkill(skill) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('name', sql.NVarChar(50), skill.name)
        .input('description', sql.NVarChar(sql.MAX), skill.description)
        .query(`
            INSERT INTO Skill (
                [name],
                [desc],
                created_at
            )
            OUTPUT
                inserted.id,
                inserted.[name] AS name,
                inserted.[desc] AS description,
                inserted.created_at AS createdAt
            VALUES (
                @name,
                @description,
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function getPortfolioSkillsByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                ps.id,
                ps.portfolio_id AS portfolioId,
                ps.skill_id AS skillId,
                s.[name] AS name,
                s.[desc] AS description,
                ps.[level] AS [level],
                ps.created_at AS createdAt
            FROM PortfolioSkill ps
            INNER JOIN Skill s ON s.id = ps.skill_id
            WHERE ps.portfolio_id = @portfolioId
            ORDER BY ps.id DESC
        `)

    return result.recordset
}

async function getPortfolioSkillById(portfolioSkillId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioSkillId', sql.Int, portfolioSkillId)
        .query(`
            SELECT TOP 1
                ps.id,
                ps.portfolio_id AS portfolioId,
                ps.skill_id AS skillId,
                s.[name] AS name,
                s.[desc] AS description,
                ps.[level] AS [level],
                ps.created_at AS createdAt
            FROM PortfolioSkill ps
            INNER JOIN Skill s ON s.id = ps.skill_id
            WHERE ps.id = @portfolioSkillId
        `)

    return result.recordset[0]
}

async function getPortfolioSkillByPortfolioAndSkillId(portfolioId, skillId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('skillId', sql.Int, skillId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                skill_id AS skillId,
                [level] AS [level],
                created_at AS createdAt
            FROM PortfolioSkill
            WHERE portfolio_id = @portfolioId AND skill_id = @skillId
        `)

    return result.recordset[0]
}

async function addSkillToPortfolio(portfolioId, skillId, level) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('skillId', sql.Int, skillId)
        .input('level', sql.TinyInt, level)
        .query(`
            INSERT INTO PortfolioSkill (
                portfolio_id,
                skill_id,
                [level],
                created_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.skill_id AS skillId,
                inserted.[level] AS [level],
                inserted.created_at AS createdAt
            VALUES (
                @portfolioId,
                @skillId,
                @level,
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updatePortfolioSkillLevel(portfolioSkillId, level) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioSkillId', sql.Int, portfolioSkillId)
        .input('level', sql.TinyInt, level)
        .query(`
            UPDATE PortfolioSkill
            SET [level] = @level
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.skill_id AS skillId,
                inserted.[level] AS [level],
                inserted.created_at AS createdAt
            WHERE id = @portfolioSkillId
        `)

    return result.recordset[0]
}

async function deletePortfolioSkillById(portfolioSkillId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('portfolioSkillId', sql.Int, portfolioSkillId)
        .query('DELETE FROM PortfolioSkill WHERE id = @portfolioSkillId')
}

module.exports = {
    findSkillByName,
    createSkill,
    getPortfolioSkillsByPortfolioId,
    getPortfolioSkillById,
    getPortfolioSkillByPortfolioAndSkillId,
    addSkillToPortfolio,
    updatePortfolioSkillLevel,
    deletePortfolioSkillById
}
