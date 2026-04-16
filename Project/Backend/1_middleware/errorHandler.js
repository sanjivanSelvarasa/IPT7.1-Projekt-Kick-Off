const ApiError = require('../5_utils/ApiError')

function mapMulterError(err) {
    if (!err || err.name !== 'MulterError') {
        return null
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        return { status: 400, message: 'Die Bilddatei ist zu groß. Maximal 5 MB sind erlaubt.' }
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return { status: 400, message: 'Ungültige Datei. Es sind nur Bilddateien erlaubt.' }
    }

    return { status: 400, message: 'Datei-Upload fehlgeschlagen.' }
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Malformed JSON body.' })
    }

    const multerMapping = mapMulterError(err)
    if (multerMapping) {
        return res.status(multerMapping.status).json({ error: multerMapping.message })
    }

    const status = Number.isInteger(err.status) ? err.status : 500
    const message = status === 500 ? 'Internal server error.' : err.message

    if (status === 500) {
        console.error('Unhandled error:', err)
    }

    const response = { error: message }
    if (err instanceof ApiError && err.details) {
        response.details = err.details
    }

    return res.status(status).json(response)
}

module.exports = errorHandler
