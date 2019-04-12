
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const envPath = process.env.ENV_PATH || path.resolve(process.cwd(), '.env')

const loadENVConfig = () => {

	if (!fs.existsSync(envPath)) {

		console.log('Missing ENV_PATH'.error)
		process.exit(1)
	}

	const loadingEnvConfig = dotenv.config({
		path: envPath
	})

	if (loadingEnvConfig.error)
		console.error(loadingEnvConfig.error)
}

loadENVConfig()