
import logger from 'plugins/lib/logger'
import FileModel from '../file-model'
import md5 from 'md5'
import 'babel-polyfill'
import fs from 'fs'

class Storage {

	store = async (file, dir, user) => {

		const {

			originalname: originalName,
			mimetype: mimeType,
			filename,
			size,
			path: filepath

		} = file;

		dir = dir ? dir : ''

		const readStream = fs.createReadStream(filepath)
			, writeStream = await this.createWriteStream(filename, dir);

		readStream.pipe(writeStream)

		//remove tmp file
		writeStream.on('finish', () => {

			fs.unlink(filepath, err => {

				if (err) logger.error(err)
			})
		})

		const publicPath = this.getPublicPath(filename, dir)

		this.insertData({...file, publicPath}, user)

		return publicPath
	}

	getPublicPath = (filename, subdir) => {

		let url = `${this.config.public_path}/${subdir}/${filename}`.replace(/\/+/g, '/')

		url = url.replace(':/', "://")

		return url
	}

	insertData = (file, user) => {

		const {

			originalname: originalName,
			mimetype: mimeType,
			filename,
			size,
			publicPath,
			path: filepath,

		} = file;

		FileModel.create({

			filename,
			size,
			originalName,
			mimeType,
			publicPath,
			uploadedBy: user ? user.id : null,
			storage: this.config.storage_name
		})
	}
}

export default Storage

