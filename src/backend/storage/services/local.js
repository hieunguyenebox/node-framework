
import Storage from './storage'
import config from 'backend/config'
import fs from 'fs'
import path from 'path'
import logger from 'backend/logger'
import { exec } from 'child_process'

class LocalStorage extends Storage {

	config = config.get('storage.local')

	upload = (filepath, dest) => {

		this.createDir(dest.substr(0, dest.lastIndexOf('/'))).then(() => {

			const readStream = fs.createReadStream(filepath)
				, writeStream = fs.createWriteStream(dest);

			readStream.pipe(writeStream)

			//remove tmp file
			writeStream.on('finish', () => {

				fs.unlink(filepath, err => {

					if (err) logger.error(err)
				})
			})
		})
	}

	getFullDirPath = (dest) => {
		return path.resolve(this.config.upload_dir, dest)
	}

	createDir = (dest) => {

		return new Promise((resolve, reject) => {

			exec(`mkdir -p ${this.getFullDirPath(dest)}`, (err) => {

				if (err)
					logger.error(err)

				resolve()
			})
		})
	}
}

export default new LocalStorage
