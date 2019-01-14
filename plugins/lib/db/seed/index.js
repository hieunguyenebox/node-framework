
import Version from './version'
import fs from 'fs'
import path from 'path'
import 'babel-polyfill'
import { loadENVConfig } from 'plugins/lib/core/preload'
loadENVConfig()

const bootstrapDB = require('plugins/lib/db').default
bootstrapDB()

const SeedVersionModel = require('./seed-version-model').default

const seedData = async () => {

	for (let v of Version) {

		const existed = await SeedVersionModel.countDocuments({ v: v.v })

		if (!existed) {

			try {

				const filePath = path.resolve(__dirname, `version/${v.file}.js`)
				const fileExist = fs.existsSync(filePath)

				if (!fileExist) return console.error(`"${v.file}.js" not found`);

				const module = require(filePath)

				if (typeof module.default !== 'function') return console.error(`"${v.file}" does not export function`);

				module.default().then(result => {

					if (result.ok)
						SeedVersionModel.create(v)
				})

			} catch (ex) {

				console.error(ex)
			}
		}
	}
}

seedData()
