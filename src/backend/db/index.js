
import MongoDB from './mongodb'
import Redis from './redis'

const dbs = {

	mongodb: {
		default: null
	},

	redis: {

		default: null
	}
}

export const getDB = (fullPath) => {

	const dbPath = fullPath.split('.')
		, type = dbPath[0]
		, name = dbPath[1] || 'default';

	switch (type) {

		case 'mongodb':
			return dbs.mongodb[name]

		case 'redis':
			return dbs.redis[name]

		default: return null
	}
}

const bootstrap = () => {

	dbs.mongodb.default = MongoDB.createConnection()

	const promisify = true
	dbs.redis.default = Redis.createClient(promisify)

}

export default bootstrap