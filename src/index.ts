
import config from 'config'
import './preload'
import path from 'path'
import colors from 'colors'

/************************************
 * VARIABLES
 ************************************/

enum FUNCTION_TYPE {
	async, await
}


/************************************
 * INTERFACES
 ************************************/
interface Plugin {

	type: FUNCTION_TYPE,
	name: string,
}

/************************************
 * FUNCTIONS
 ************************************/
/**
 * author: hieu nguyen
 * desc: catch all exception and unhandled rejection
 */
const listenErrors = () => {

	process.on('unhandledRejection', (reason: any, p) => {

		console.log(colors.bgRed.white(reason.stack))
	});

	process.on('uncaughtException', (reason: any) => {

		console.log(colors.bgRed.white(reason.stack))
	});
}

/**
 * author: hieunguyen
 * desc: bootstrap plugins
 * @param plugins: array of plugins
 */
const bootstrapPlugins = async (plugins: Array<Plugin>) => {

	try {

		if (Array.isArray(plugins)) {

			for (let pluginConfig of plugins) {

				const pluginPath = path.resolve(process.cwd(), `build/${pluginConfig.name}`)
				
				const plugin = require(pluginPath)

				if (plugin && typeof plugin.bootstrap === 'function') {

					if (plugin.type === FUNCTION_TYPE.async)
						plugin.bootstrap()
					else
						await plugin.bootstrap()
				}
			}
		}

	} catch (ex) {

		console.log(colors.bgRed.white(ex))
	}
}

/**
 * author: hieunguyen
 * desc: start app
 */
const start = () => {

	const environments: Array<string> = ['development', 'production', 'staging']

	if (!environments.includes(process.env.NODE_ENV)) {

		console.log('Please provide NODE_ENV=development/staging/production'.red)
		process.exit(1)
	}

	listenErrors()

	const { plugins }: {plugins: Array<Plugin>} = config.get('bootstrap')

	bootstrapPlugins(plugins)
}


/************************************
 * INVOKE FUNCTIONS
 ************************************/
start()
