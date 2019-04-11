
import dotenv from 'dotenv'
import config from 'backend/config'

const envPath = config.get('env-path')

export const loadENVConfig = () => {

	const loadingEnvConfig = dotenv.config({
		path: envPath
	})

	if (loadingEnvConfig.error)
		console.error(loadingEnvConfig.error)
}