const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1034 * 1024 // 3 MB
    }
})

module.exports = { upload } 