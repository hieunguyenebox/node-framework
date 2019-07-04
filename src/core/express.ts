
import config from 'config'
import Static from 'serve-static'
import { logger } from './logger'
import { createClient } from './redis';
import 'colors'
import passport from 'passport';

let express = require('express')
	, session = require('express-session')
	, bodyParser = require('body-parser')
	, path = require('path')
	, appConfig: any = config.get('app')
	, rootPath = process.cwd();

const app = express()
export const route = express.Router()

const middlewares = [Static(path.resolve(rootPath, 'public'))];

app.set('trust proxy', appConfig.ssl)

app.use(session({
		...appConfig.session,
		secret: process.env.SECRET,
		store: createClient(false)
	}))
	.use(middlewares)
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(passport.initialize())
	.use(passport.session())
	.use(route)
	.use((err:any, _, res: any) => {
		
		console.log(err)
		logger.error(err)
		return res.json({ok: 0, msg: 'Something Broken!'})

	});

export const startServer = (): void => {

	const port = process.env.NODE_PORT || 3000
	const hostString = process.env.NODE_HOST || 'localhost'
	const hosts: Array<string> = hostString.split(',')

	for (let host of hosts) {

		host = host.trim()

		app.listen(port, host, () => console.log(`Server is listening on ${host}:${port}`.bgGreen))
	}
}
