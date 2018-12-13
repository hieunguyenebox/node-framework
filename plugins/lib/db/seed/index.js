
import Version from './version'
import fs from 'fs'
import path from 'path'
import 'babel-polyfill'
import { loadENVConfig } from 'plugins/core/preload'

loadENVConfig()

const SeedVersionModel = require('./seed-version-model').default

const seedData = async () => {

	for (let v of Version) {

		const existed = await SeedVersionModel.count({ v: v.v })

		if (!existed) {

			try {

				const fileExist = fs.existsSync(path.resolve(__dirname, `version/${v.file}.js`))

				if (!fileExist) return console.error(`"${v.file}.js" not found`);

				const module = require(v.file)

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