const File = require('../models/File')
const Box = require('../models/Box')

class FileController {
	async store(req, res) {
		const box = await Box.findById(req.params.id)

		const file = await File.create({
			title: req.file.originalname,
			path: req.file.key
		})

		box.files.push(file)

		await box.save()

		req.io.sockets.in(box._id).emit('file', file)

		return res.json(file)
	}

	async getFileById(id) {
		const file = await File.findById(id)
		return file.path
	}

	async remove(req, res) {
		const file = await File.findByIdAndDelete(req.params.id)

		return res.json(file.path)
	}



}

module.exports = new FileController()