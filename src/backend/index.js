
import config from 'backend/config'
import { loadENVConfig } from './preload'
import logger from 'backend/logger'

let fs = require('fs')
	, path = require('path');

const listenErrors = () => {

	process.on('unhandledRejection', (reason, p) => {

		logger.error(reason)
	});

	process.on('uncaughtException', (reason, p) => {

		logger.error(reason)
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

				if (plugin && typeof plugin.default === 'function') {

					plugin.default()
				}
			}
		}

	} catch (ex) {

		logger.error(ex)
	}
}

export const startPlugins = () => {

	loadENVConfig()
	listenErrors()

	const { plugins, modules } = config.get('bootstrap')
	bootstrapPlugins(plugins)
	bootstrapPlugins(modules, true)
}

startPlugins()
