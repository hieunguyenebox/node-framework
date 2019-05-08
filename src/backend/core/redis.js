
import redis from 'redis'
import { promisify } from 'util'
import colors from 'colors'

const functions = [
	'get', 'set', 'del', 'sismember',
	'sadd', 'srem', 'scard', 'hset',
	'hget', 'hexists', 'hdel',
	'hkeys', 'hlen', 'hgetall',
	'sadd', 'spop', 'send_command'
]

const promisifyClient = client => {

	return functions.map(func => promisify(client[func]).bind(client))
}

export const createClient = (promisify = true) => {

	const {

		REDIS_HOST: host,
		REDIS_PORT: port,
		REDIS_PREFIX: prefix,
		REDIS_PASS: password

	} = process.env

	const opts = { host, port, prefix, password }

	const client = redis.createClient(opts)

	client.on('error', error => console.error(error))
	client.on('connect', () => console.log(`a connection to redis ${host}:${port}`.bgGreen))

	return promisify ? promisifyClient(client) : client
}

export const redisClient = createClient()