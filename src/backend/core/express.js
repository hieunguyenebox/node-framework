
import config from 'config'
import Static from 'serve-static'
import { initRoutes } from './routes';
import { logger } from './logger'
import { createClient } from './redis';
import colors from 'colors'

let express = require('express')
	, session = require('express-session')
	, bodyParser = require('body-parser')
	, path = require('path')
	, appConfig = config.get('app')
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
	.use(bodyParser.text(), (req, res, next) => {

		try {

			req.body = JSON.parse(req.body)

		} catch(ex) {

		}
		next()
	})
	.use(bodyParser.urlencoded({ extended: false }))
	.use(route)
	.use((err, req, res, next) => {
		
		logger.error(err)
		return res.json({ok: 0, msg: 'Something Broken!'})
	});

export const startServer = () => {

	initRoutes()
	
	const port = process.env.NODE_PORT || 3000

	let hosts = process.env.NODE_HOST || 'localhost'

	hosts = hosts.split(',')

	for (let host of hosts) {

		host = host.trim()

		app.listen(port, host, () => console.log(`Server is listening on ${host}:${port}`.bgGreen))
	}
}
