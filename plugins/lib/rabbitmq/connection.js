
import logger from 'plugins/lib/logger'
import { promisify } from 'util'

const {

	RABBITMQ_HOST: host,
	RABBITMQ_PORT: port,
	RABBITMQ_VHOST: vhost,
	RABBITMQ_USER: user,
	RABBITMQ_PASS: pass

} = process.env

const amqp = require('amqplib/callback_api')
	, connStr = `amqp://${user}:${encodeURIComponent(pass)}@${host}:${port}/${vhost}`
	, connect = promisify(amqp.connect)


const connectInfo = `amqp://${host}:${port}/${vhost}`

let connection = null, connected = false

export const createConnection = async () => {

	try {

		if (!connection) {
			connection = await connect(connStr)
			connected = true
		}

		console.log(`Connected to ${connectInfo}`)

		return connection

	} catch (ex) {

	}

	return null
}


export const channel =  (() => {

	return createConnection().then(conn => {

		const createChannel = promisify(conn.createChannel).bind(conn)

		return () => createChannel().then(ch => ch)
	})

})()
