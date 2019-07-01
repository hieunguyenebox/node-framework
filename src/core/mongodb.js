
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


let firstConnection = false

const createConnection = () => {

	let connectUri = `mongodb://${DB_DEFAULT_HOST}:${DB_DEFAULT_PORT}/${DB_DEFAULT_NAME}`
		, options = {
			useNewUrlParser: true,
			useCreateIndex: true,
			user: DB_DEFAULT_USER,
			pass: DB_DEFAULT_PASS,
			reconnectTries: Number.MAX_SAFE_INTEGER
		}

	const conn = mongoose.createConnection(connectUri, options)

	conn.on('open', () => {
		firstConnection = true
		console.log(`a connection to ${connectUri}`.bgGreen)
	})
	
	conn.on('error', err => {
		
		if (firstConnection == false) {
			
			setTimeout(createConnection, 3000)
		}

		console.log(err)
	})

	return conn
}

export const mongodb = createConnection()