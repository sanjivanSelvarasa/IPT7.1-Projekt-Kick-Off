const sql = require('mssql')

let poolPromise

function getConfig() {
    return {
        server: process.env.DB_SERVER,
        port: Number(process.env.DB_PORT || 1433),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        options: {
            encrypt: process.env.DB_ENCRYPT === 'true',
            trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
        },
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
}

function validateConfig() {
    const requiredVariables = [
        'DB_SERVER',
        'DB_NAME',
        'DB_USER',
        'DB_PASSWORD'
    ]

    const missingVariables = requiredVariables.filter(variableName => !process.env[variableName])

    if (missingVariables.length > 0) {
        throw new Error(`Missing database environment variables: ${missingVariables.join(', ')}`)
    }
}

async function ensureRefreshTokenTable() {
    const pool = await getPool()
    const result = await pool.request().query(`
        SELECT 1 AS schema_ready
        WHERE OBJECT_ID('dbo.[User]', 'U') IS NOT NULL
          AND OBJECT_ID('dbo.UserRefreshToken', 'U') IS NOT NULL
    `)

    if (result.recordset.length === 0) {
        throw new Error('Database schema is incomplete. Run the fixed CreateYourselfDB.sql initialization first.')
    }
}

function createPool() {
    validateConfig()

    if (!poolPromise) {
        poolPromise = sql.connect(getConfig())
    }

    return poolPromise
}

async function getPool() {
    return createPool()
}

async function connectWithRetry(maxAttempts = 10, retryDelayMs = 3000) {
    let lastError

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            await createPool()
            await ensureRefreshTokenTable()
            return
        } catch (error) {
            lastError = error
            poolPromise = undefined

            if (attempt < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, retryDelayMs))
            }
        }
    }

    throw lastError
}

async function closePool() {
    if (!poolPromise) {
        return
    }

    try {
        const pool = await poolPromise
        await pool.close()
    } finally {
        poolPromise = undefined
    }
}

module.exports = {
    getPool,
    connectWithRetry,
    closePool
}