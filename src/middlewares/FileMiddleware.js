const fileController = require('../controllers/FileController')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res, next) => {
	const archivePath = await fileController.getFileById(req.params.id)

	try {
		fs.unlink(path.resolve(__dirname, '..', '..', 'tmp', archivePath), (error) => {
			if (error) {
				throw new Error('Não foi possivel deletar o arquivo')
			}
		})
	} catch (error) {
		throw error
	}

	return next()
}