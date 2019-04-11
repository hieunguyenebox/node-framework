
import logger from 'backend/logger'
import FileModel from '../models/file-model'
import 'babel-polyfill'
import fs from 'fs'

class Storage {

	store = async (file, subdir, user) => {

		if (!subdir) subdir = '';

		this.upload(file.path, this.getDest(file.filename , subdir), subdir)

		const publicPath = this.getPublicPath(file.filename, subdir)
		
		this.insertData({...file, publicPath}, user)

		return publicPath;
	}

	getDest = (filename, subdir) => {

		let filePath = `${this.config.upload_dir}/${subdir}/${filename}`.replace(/\/+/g, '/')

		return filePath
	}

	upload = async (filepath, dest, subdir) => {

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

