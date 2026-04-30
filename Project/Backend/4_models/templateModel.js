const sql = require('mssql')

const database = require('./database')

async function getTemplates() {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .query(`
            SELECT
                id,
                [name] AS name,
                description,
                layout_type AS layoutType,
                preview_img AS previewImg,
                created_at AS createdAt
            FROM Template
            ORDER BY id ASC
        `)

    return result.recordset
}

async function getTemplateById(templateId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('templateId', sql.Int, templateId)
        .query(`
            SELECT TOP 1
                id,
                [name] AS name,
                description,
                layout_type AS layoutType,
                preview_img AS previewImg,
                created_at AS createdAt
            FROM Template
            WHERE id = @templateId
        `)

    return result.recordset[0]
}

module.exports = {
    getTemplates,
    getTemplateById
}
