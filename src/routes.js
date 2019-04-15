const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router()

const FileMiddleware = require('./middlewares/FileMiddleware')
const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')

routes.get('/boxes/:id', BoxController.show)

routes.post('/boxes',
	BoxController.store
)

routes.post('/boxes/:id/files',
	multer(multerConfig).single('file'),
	FileController.store
)

routes.delete('/file/:id',
	FileMiddleware,
	FileController.remove
)

module.exports = routes