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
                template_id AS templateId,
                current_theme_id AS currentThemeId,
                current_version_id AS currentVersionId,
                title,
                description,
                slug,
                visibility,
                language_code AS languageCode,
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
    const transaction = new sql.Transaction(pool)

    await transaction.begin()

    try {
        const portfolioResult = await transaction
            .request()
            .input('userId', sql.Int, userId)
            .input('templateId', sql.Int, portfolio.templateId ?? null)
            .input('title', sql.NVarChar(100), portfolio.title)
            .input('description', sql.NVarChar(sql.MAX), portfolio.description)
            .input('slug', sql.NVarChar(100), portfolio.slug)
            .input('visibility', sql.NVarChar(20), portfolio.visibility)
            .input('languageCode', sql.NVarChar(10), portfolio.languageCode)
            .query(`
                INSERT INTO Portfolio (
                    [user_id],
                    template_id,
                    title,
                    description,
                    slug,
                    visibility,
                    language_code,
                    created_at,
                    updated_at
                )
                OUTPUT
                    inserted.id,
                    inserted.[user_id] AS userId,
                    inserted.template_id AS templateId,
                    inserted.current_theme_id AS currentThemeId,
                    inserted.current_version_id AS currentVersionId,
                    inserted.title,
                    inserted.description,
                    inserted.slug,
                    inserted.visibility,
                    inserted.language_code AS languageCode,
                    inserted.created_at AS createdAt,
                    inserted.updated_at AS updatedAt
                VALUES (
                    @userId,
                    @templateId,
                    @title,
                    @description,
                    @slug,
                    @visibility,
                    @languageCode,
                    SYSUTCDATETIME(),
                    SYSUTCDATETIME()
                )
            `)

        const createdPortfolio = portfolioResult.recordset[0]

        const versionResult = await transaction
            .request()
            .input('portfolioId', sql.Int, createdPortfolio.id)
            .input('versionNumber', sql.Int, 1)
            .input('titleSnapshot', sql.NVarChar(100), createdPortfolio.title)
            .input('isPublished', sql.Bit, 0)
            .query(`
                INSERT INTO PortfolioVersion (
                    portfolio_id,
                    version_number,
                    title_snapshot,
                    is_published,
                    created_at
                )
                OUTPUT
                    inserted.id,
                    inserted.portfolio_id AS portfolioId,
                    inserted.version_number AS versionNumber,
                    inserted.title_snapshot AS titleSnapshot,
                    inserted.is_published AS isPublished,
                    inserted.created_at AS createdAt
                VALUES (
                    @portfolioId,
                    @versionNumber,
                    @titleSnapshot,
                    @isPublished,
                    SYSUTCDATETIME()
                )
            `)

        const initialVersion = versionResult.recordset[0]

        await transaction
            .request()
            .input('portfolioId', sql.Int, createdPortfolio.id)
            .input('versionId', sql.Int, initialVersion.id)
            .query(`
                UPDATE Portfolio
                SET
                    current_version_id = @versionId,
                    updated_at = SYSUTCDATETIME()
                WHERE id = @portfolioId
            `)

        await transaction.commit()

        return {
            ...createdPortfolio,
            currentVersionId: initialVersion.id
        }
    } catch (error) {
        await transaction.rollback().catch(() => undefined)
        throw error
    }
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
                current_theme_id AS currentThemeId,
                current_version_id AS currentVersionId,
                title,
                description,
                slug,
                visibility,
                template_id AS templateId,
                language_code AS languageCode,
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
        .input('templateId', sql.Int, portfolio.templateId ?? null)
        .input('title', sql.NVarChar(100), portfolio.title)
        .input('description', sql.NVarChar(sql.MAX), portfolio.description)
        .input('slug', sql.NVarChar(100), portfolio.slug)
        .input('visibility', sql.NVarChar(20), portfolio.visibility)
        .input('languageCode', sql.NVarChar(10), portfolio.languageCode)
        .query(`
            UPDATE Portfolio
            SET
                template_id = @templateId,
                title = @title,
                description = @description,
                slug = @slug,
                visibility = @visibility,
                language_code = @languageCode,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.[user_id] AS userId,
                inserted.template_id AS templateId,
                inserted.current_theme_id AS currentThemeId,
                inserted.current_version_id AS currentVersionId,
                inserted.title,
                inserted.description,
                inserted.slug,
                inserted.visibility,
                inserted.language_code AS languageCode,
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

async function getPortfolioBySlug(slug) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('slug', sql.NVarChar(100), slug)
        .query(`
            SELECT TOP 1
                id,
                [user_id] AS userId,
                template_id AS templateId,
                current_theme_id AS currentThemeId,
                current_version_id AS currentVersionId,
                title,
                description,
                slug,
                visibility,
                language_code AS languageCode,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM Portfolio
            WHERE slug = @slug
        `)

    return result.recordset[0]
}

async function getTranslationsByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                id,
                portfolio_id AS portfolioId,
                language_code AS languageCode,
                title,
                description,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM PortfolioTranslation
            WHERE portfolio_id = @portfolioId
            ORDER BY language_code ASC, id ASC
        `)

    return result.recordset
}

async function getTranslationById(translationId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('translationId', sql.Int, translationId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                language_code AS languageCode,
                title,
                description,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM PortfolioTranslation
            WHERE id = @translationId
        `)

    return result.recordset[0]
}

async function findTranslationByLanguageCode(portfolioId, languageCode) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('languageCode', sql.NVarChar(10), languageCode)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                language_code AS languageCode,
                title,
                description,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM PortfolioTranslation
            WHERE portfolio_id = @portfolioId
              AND LOWER(language_code) = LOWER(@languageCode)
        `)

    return result.recordset[0]
}

async function createTranslationForPortfolio(portfolioId, translation) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('languageCode', sql.NVarChar(10), translation.languageCode)
        .input('title', sql.NVarChar(100), translation.title)
        .input('description', sql.NVarChar(sql.MAX), translation.description)
        .query(`
            INSERT INTO PortfolioTranslation (
                portfolio_id,
                language_code,
                title,
                description,
                created_at,
                updated_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.language_code AS languageCode,
                inserted.title,
                inserted.description,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            VALUES (
                @portfolioId,
                @languageCode,
                @title,
                @description,
                SYSUTCDATETIME(),
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function updateTranslation(translationId, translation) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('translationId', sql.Int, translationId)
        .input('languageCode', sql.NVarChar(10), translation.languageCode)
        .input('title', sql.NVarChar(100), translation.title)
        .input('description', sql.NVarChar(sql.MAX), translation.description)
        .query(`
            UPDATE PortfolioTranslation
            SET
                language_code = @languageCode,
                title = @title,
                description = @description,
                updated_at = SYSUTCDATETIME()
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.language_code AS languageCode,
                inserted.title,
                inserted.description,
                inserted.created_at AS createdAt,
                inserted.updated_at AS updatedAt
            WHERE id = @translationId
        `)

    return result.recordset[0]
}

async function deleteTranslationById(translationId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('translationId', sql.Int, translationId)
        .query('DELETE FROM PortfolioTranslation WHERE id = @translationId')
}

async function getVersionsByPortfolioId(portfolioId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT
                pv.id,
                pv.portfolio_id AS portfolioId,
                pv.version_number AS versionNumber,
                pv.title_snapshot AS titleSnapshot,
                pv.is_published AS isPublished,
                pv.created_at AS createdAt,
                CAST(CASE WHEN p.current_version_id = pv.id THEN 1 ELSE 0 END AS bit) AS isActive
            FROM PortfolioVersion pv
            INNER JOIN Portfolio p ON p.id = pv.portfolio_id
            WHERE pv.portfolio_id = @portfolioId
            ORDER BY
                CASE WHEN p.current_version_id = pv.id THEN 0 ELSE 1 END,
                pv.version_number DESC,
                pv.id DESC
        `)

    return result.recordset
}

async function getVersionById(versionId) {
    const pool = await database.getPool()
    const result = await pool
        .request()
        .input('versionId', sql.Int, versionId)
        .query(`
            SELECT TOP 1
                id,
                portfolio_id AS portfolioId,
                version_number AS versionNumber,
                title_snapshot AS titleSnapshot,
                is_published AS isPublished,
                created_at AS createdAt
            FROM PortfolioVersion
            WHERE id = @versionId
        `)

    return result.recordset[0]
}

async function createVersionForPortfolio(portfolioId, version) {
    const pool = await database.getPool()
    const nextVersionNumberResult = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .query(`
            SELECT ISNULL(MAX(version_number), 0) + 1 AS nextVersionNumber
            FROM PortfolioVersion
            WHERE portfolio_id = @portfolioId
        `)

    const versionNumber = nextVersionNumberResult.recordset[0].nextVersionNumber

    const result = await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('versionNumber', sql.Int, versionNumber)
        .input('titleSnapshot', sql.NVarChar(100), version.titleSnapshot)
        .input('isPublished', sql.Bit, version.isPublished)
        .query(`
            INSERT INTO PortfolioVersion (
                portfolio_id,
                version_number,
                title_snapshot,
                is_published,
                created_at
            )
            OUTPUT
                inserted.id,
                inserted.portfolio_id AS portfolioId,
                inserted.version_number AS versionNumber,
                inserted.title_snapshot AS titleSnapshot,
                inserted.is_published AS isPublished,
                inserted.created_at AS createdAt
            VALUES (
                @portfolioId,
                @versionNumber,
                @titleSnapshot,
                @isPublished,
                SYSUTCDATETIME()
            )
        `)

    return result.recordset[0]
}

async function setCurrentVersionForPortfolio(portfolioId, versionId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('versionId', sql.Int, versionId)
        .query(`
            UPDATE Portfolio
            SET
                current_version_id = @versionId,
                updated_at = SYSUTCDATETIME()
            WHERE id = @portfolioId
        `)
}

async function clearCurrentVersionIfMatching(portfolioId, versionId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('portfolioId', sql.Int, portfolioId)
        .input('versionId', sql.Int, versionId)
        .query(`
            UPDATE Portfolio
            SET
                current_version_id = NULL,
                updated_at = SYSUTCDATETIME()
            WHERE id = @portfolioId
              AND current_version_id = @versionId
        `)
}

async function deleteVersionById(versionId) {
    const pool = await database.getPool()
    await pool
        .request()
        .input('versionId', sql.Int, versionId)
        .query('DELETE FROM PortfolioVersion WHERE id = @versionId')
}

module.exports = {
    findUserByEmail,
    getPortfoliosByUserId,
    createPortfolioForUser,
    getPortfolioById,
    getPortfolioBySlug,
    updatePortfolio,
    deletePortfolioById,
    getTranslationsByPortfolioId,
    getTranslationById,
    findTranslationByLanguageCode,
    createTranslationForPortfolio,
    updateTranslation,
    deleteTranslationById,
    getVersionsByPortfolioId,
    getVersionById,
    createVersionForPortfolio,
    setCurrentVersionForPortfolio,
    clearCurrentVersionIfMatching,
    deleteVersionById
}
