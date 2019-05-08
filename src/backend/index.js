
import config from 'config'
import './preload'
import { logger } from 'backend/core'
import path from 'path'
import fs from 'fs'
import colors from 'colors'

const listenErrors = () => {

	process.on('unhandledRejection', (reason, p) => {

		console.log(colors.bgRed.white(reason.stack))
	});

	process.on('uncaughtException', (reason, p) => {

		console.log(colors.bgRed.white(reason.stack))
	});
}

const bootstrapPlugins = (plugins, nodeModules = false) => {

	try {

		if (Array.isArray(plugins)) {

			for (let key in plugins) {

				const pluginName = plugins[key]

				let index = pluginName

				if (!nodeModules)
					index = path.resolve(process.cwd(), `dist/${pluginName}`)
				
				const plugin = require(index)

				if (plugin && typeof plugin.bootstrap === 'function') {

					plugin.bootstrap()
				}
			}
		}

	} catch (ex) {

		console.log(colors.bgRed.white(ex))
	}
}

export const startPlugins = () => {

	const environments = ['development', 'production', 'staging']

	if (!environments.includes(process.env.NODE_ENV)) {

		console.log('Please provide NODE_ENV=development/staging/production'.error)
		process.exit(1)
	}

	listenErrors()

	const { plugins, node_modules } = config.get('bootstrap')
	bootstrapPlugins(plugins)
	bootstrapPlugins(node_modules, true)
}

startPlugins()
