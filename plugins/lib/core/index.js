
import config from 'plugins/lib/config'
import { loadENVConfig } from './preload'

let fs = require('fs')
	, path = require('path');

const listenErrors = () => {

	process.on('unhandledRejection', (reason, p) => {

		console.error(reason)
	});

	process.on('uncaughtException', (reason, p) => {

		console.error(reason)
	});
}

const bootstrapPlugins = (plugins, nodeModules = false) => {

	try {

		if (Array.isArray(plugins)) {

			for (let key in plugins) {

				const pluginName = plugins[key]

				let index = pluginName

				if (!nodeModules)
					index = path.resolve(__dirname, `../../${pluginName}`)
				
				const plugin = require(index)

				if (plugin && typeof plugin.default === 'function') {

					plugin.default()
				}
			}
		}

	} catch (ex) {

		console.error(ex)
	}
}

export const startPlugins = () => {

	loadENVConfig()
	listenErrors()

	const { plugins, modules } = config.get('bootstrap-plugins')
	bootstrapPlugins(plugins)
	bootstrapPlugins(modules, true)
}

startPlugins()
