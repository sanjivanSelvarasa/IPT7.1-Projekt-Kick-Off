const crypto = require('crypto')
const fs = require('fs')
const multer = require('multer')
const path = require('path')

const uploadRoot = path.join(__dirname, '..', 'uploads', 'projects')

function resolveExtension(file) {
    if (file.mimetype === 'image/png') return '.png'
    if (file.mimetype === 'image/jpeg') return '.jpg'
    if (file.mimetype === 'image/webp') return '.webp'
    return '.img'
}

// Ensure upload directory exists once at startup
fs.mkdirSync(uploadRoot, { recursive: true })

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, uploadRoot)
    },
    filename(req, file, callback) {
        const extension = resolveExtension(file)
        const uniqueName = `${crypto.randomUUID()}${extension}`
        callback(null, uniqueName)
    }
})

function fileFilter(req, file, callback) {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
        return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'image'))
    }

    return callback(null, true)
}

const uploadProjectImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

module.exports = uploadProjectImage
