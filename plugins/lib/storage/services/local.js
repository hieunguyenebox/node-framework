
import Storage from './storage'
import config from 'plugins/lib/config'
import fs from 'fs'
import path from 'path'
import logger from 'plugins/lib/logger'
import { exec } from 'child_process'

class LocalStorage extends Storage {

	config = config.get('storage.local')

	createWriteStream = async (filename, subdir) => {

		await this.createDir(subdir)

		const newfilepath = (this.getFullDirPath(subdir) + '/' + filename).replace(/\/+/g, '/')

		return fs.createWriteStream(newfilepath)
	}

	getFullDirPath = (subdir) => {
		// console.log(this.config.upload_dir);
		return path.resolve(this.config.upload_dir, subdir)
	}

	createDir = (subdir) => {

		return new Promise((resolve, reject) => {

			exec(`mkdir -p ${this.getFullDirPath(subdir)}`, (err) => {

				if (err)
					logger.error(err)

				resolve()
			})
		})
	}
}

export default new LocalStorage
