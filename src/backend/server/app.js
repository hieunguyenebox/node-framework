
import config from 'backend/config'
import Static from 'serve-static'

let express = require('express')
	, session = require('express-session')
	, bodyParser = require('body-parser')
	, app = express()
	, path = require('path')
	, sessionConfig = config.get('session')
	, rootPath = process.cwd();

sessionConfig.secret = process.env.SECRET

const middlewares = [Static(path.resolve(rootPath, 'public'))];

if (process.env.NODE_ENV !== 'local')
	app.set('trust proxy', true)

app.use(session(sessionConfig))
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

export default app