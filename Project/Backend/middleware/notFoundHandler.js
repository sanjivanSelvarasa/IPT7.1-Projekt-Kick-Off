const ApiError = require('../utils/ApiError')

function notFoundHandler(req, res, next) {
    next(new ApiError(404, 'Route not found.'))
}

module.exports = notFoundHandler
