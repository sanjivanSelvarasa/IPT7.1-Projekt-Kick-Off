const ApiError = require('../utils/ApiError')

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Malformed JSON body.' })
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
