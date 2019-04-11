
import config from 'backend/config'
import multer from 'multer'
import app from 'backend/server/app'
import path from 'path'
import nanoid from 'nanoid'
import md5 from 'md5'
import fs from 'fs'
import logger from 'backend/logger'
import Storage from 'backend/storage'

const { maxFiles, maxFileSize } = config.get('storage.limit')

const storage = Storage(config.get('storage.default'))
	
const uploadStorage = multer.diskStorage({

	destination: (req, file, cb) => {

		cb(null, '/tmp/uploads')
	},
	filename: (req, file, cb) => {

		const nameParts = file.originalname.split('.')

		const ext = nameParts[nameParts.length-1]

		const newName = md5(nanoid(20)) + `.${ext}`

		cb(null, newName)
	}
})

const upload = multer({

	storage: uploadStorage,
	limits: {

		files: maxFiles,
		fileSize: maxFileSize
	}

})

const createTmpDir = () => {

	if (!fs.existsSync('/tmp/uploads'))
		fs.mkdir('/tmp/uploads', () => {})
}

const bootstrap = () => {

	createTmpDir()

	app.post('/upload', upload.single('file'), (req, res) => {

		storage.store(req.file).then(url => res.json({url})).catch(err => {
			logger.error(err)
			res.json({url: ''})
		})
	})
}

export default bootstrap
