
import immutable from 'immutable'
var path = require('path')
var fs = require('fs')

export default {

	getEnv () {

		return process.env.NODE_ENV || 'development'
	},

	getConfig (config, configNames) {

		let name = ''

		while (name = configNames.shift()) {

			if (config && typeof config === 'object') {

				config = config[name]
			}
		}

		return config
	},

	isDirOrFile (filePath) {

		if ( fs.existsSync(filePath) )
			return filePath

		if ( fs.existsSync(filePath + '.js') )
			return filePath + '.js'

		return ''
	},

	findConfig (configPath, env = '') {

		let configNames = configPath.split('.')
			, filePath = path.resolve(process.cwd(), `config/${env}`)
			, name = '';

		while ( name = configNames.shift() ) {

			filePath += `/${name}`

			filePath = this.isDirOrFile(filePath)

			if (filePath.indexOf('.js') === -1 && !fs.existsSync(filePath + '/index.js')) continue;

			if (filePath) {

				try {

					let configData = require(filePath)

					if (typeof configData === 'object')
						configData = immutable.fromJS(configData).toJS()

					return this.getConfig(configData, configNames)

				} catch (ex) {

					console.error(ex)
					return undefined
				}
			}
		}

		return undefined
	},

	get (configPath) {

		let config = this.findConfig(configPath, process.env.NODE_ENV)

		if (!config)
			config = this.findConfig(configPath)

		return config
	}
}