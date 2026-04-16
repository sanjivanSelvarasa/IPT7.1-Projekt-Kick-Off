const fs = require('fs')
const path = require('path')
const multer = require('multer')

const uploadRoot = path.join(__dirname, '..', 'uploads', 'projects')

function ensureUploadDirectory() {
    fs.mkdirSync(uploadRoot, { recursive: true })
}

function resolveExtension(file) {
    const extensionFromName = path.extname(file.originalname || '').toLowerCase()
    if (extensionFromName) {
        return extensionFromName
    }

    if (file.mimetype === 'image/png') {
        return '.png'
    }

    if (file.mimetype === 'image/jpeg') {
        return '.jpg'
    }

    if (file.mimetype === 'image/webp') {
        return '.webp'
    }

    return '.img'
}

const storage = multer.diskStorage({
    destination(req, file, callback) {
        ensureUploadDirectory()
        callback(null, uploadRoot)
    },
    filename(req, file, callback) {
        const extension = resolveExtension(file)
        const uniqueName = `project-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
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
