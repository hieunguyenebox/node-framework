
import redis, { RedisClient, ClientOpts } from 'redis'
import { promisify } from 'util'
import 'colors'

enum enumFunction {
	get, set, del, sismember,
	sadd, srem, scard, hset,
	hget, hexists, hdel, hkeys, hlen,
	hgetall, spop, send_command
}

const promisifyClient = (client: RedisClient) => {

	for (let index in enumFunction) {

		const func: Function = client[enumFunction[index]]

		if (func)
			promisify(client[enumFunction[index]]).bind(client)
	}
}

export const createClient = (promisify = true): RedisClient => {

	const {

		REDIS_HOST: host,
		REDIS_PORT: port,
		REDIS_PREFIX: prefix,
		REDIS_PASS: password

	} = process.env

	const opts: ClientOpts = { host, port: parseInt(port || ""), prefix, password }

	const client = redis.createClient(opts)

	client.on('error', error => console.error(error))
	client.on('connect', () => console.log(`a connection to redis ${host}:${port}`.bgGreen))

	if (promisify) promisifyClient(client);

	return client;
}

export const redisClient = createClient()