
import redis from 'redis'
import { promisify } from 'util'

const promisifyClient = client => ({

	get: promisify(client.get).bind(client),

	set: promisify(client.set).bind(client),

	del: promisify(client.del).bind(client),

	sismember: promisify(client.sismember).bind(client),


	srem: promisify(client.srem).bind(client),
	
	scard: promisify(client.scard).bind(client),

	hset: promisify(client.hset).bind(client),

	hexists:  promisify(client.hexists).bind(client),

	hget: promisify(client.hget).bind(client),

	hdel: promisify(client.hdel).bind(client),

	hkeys: promisify(client.hkeys).bind(client),

	hlen: promisify(client.hlen).bind(client),
	hgetall: promisify(client.hgetall).bind(client),
	sadd: promisify(client.sadd).bind(client),
	spop: promisify(client.spop).bind(client),
	send_command: promisify(client.send_command).bind(client),
})

const createClient = (promisify) => {

	const {

		REDIS_HOST: host,
		REDIS_PORT: port,
		REDIS_PREFIX: prefix,
		REDIS_PASS: pass

	} = process.env

	const opts = { host, port, prefix }

	if (process.env.NODE_ENV !== 'local')
		opts.password = pass

	const client = redis.createClient(opts)

	client.on('error', error => console.error(error))
	client.on('connect', () => console.log(`connected to redis ${host}:${port}`))

	return promisify ? promisifyClient(client) : client
}

export default { createClient }

