
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const {

	DB_DEFAULT_NAME,
	DB_DEFAULT_HOST,
	DB_DEFAULT_PORT,
	DB_DEFAULT_PASS,
	DB_DEFAULT_USER

} = process.env

const createConnection = () => {

	let connectUri = `mongodb://${DB_DEFAULT_HOST}:${DB_DEFAULT_PORT}/${DB_DEFAULT_NAME}`
		, options = {
			useNewUrlParser: true,
			autoIndex: true
		}

	if (process.env.NODE_ENV !== 'local') {

		options.user = DB_DEFAULT_USER
		options.pass = DB_DEFAULT_PASS
	}

	const conn = mongoose.createConnection(connectUri, options)

	conn.on('open', () => console.log(`connected to ${connectUri}`))
	conn.on('error', console.error.bind(console, 'connection error:'))

	return conn
}

export default { createConnection }