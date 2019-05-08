
import mongoose from 'mongoose'
import colors from 'colors'

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
			useCreateIndex: true,
			user: DB_DEFAULT_USER,
			pass: DB_DEFAULT_PASS
		}

	const conn = mongoose.createConnection(connectUri, options)

	conn.on('open', () => console.log(`a connection to ${connectUri}`.bgGreen))
	conn.on('error', console.error.bind(console, 'connection error:'))

	return conn
}

export const mongodb = createConnection()