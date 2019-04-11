
import { channel } from './connection'
import config from 'backend/config'
import 'babel-polyfill'
import logger from 'backend/logger'

const channels = {}

const initChannel = async (channelConfig) => {

	const { exchange, prefetch, type, options, route, queue, consume } = channelConfig
		, callbacks = [];

	const ch = await channel.then(createChannel => createChannel())

	if (ch) {

		ch.assertExchange(exchange, type, options)
		ch.assertQueue(queue, options)
		ch.bindQueue(queue, exchange, route)
		ch.prefetch(prefetch)

		console.log(`Init channel: ${exchange} - ${route} - ${queue} - ${type}${consume ? ` - prefetch: ${prefetch}` : ''}`)

		if (consume) {

			ch.consume(queue, msg => {

				let parsedMsg = msg.content.toString()

				logger.info(`New msg: ${parsedMsg}`)

				try {

					parsedMsg = JSON.parse(parsedMsg)

				} catch (ex) {

				}

				callbacks.forEach(cb => {

					if (typeof cb === 'function')
						cb(parsedMsg, () => ch.ack(msg))
				})
			})
		}
	}

	const publish = (data) => {

		ch.publish(exchange, route, Buffer.from(JSON.stringify(data)))
		logger.info(JSON.stringify(data) + ' sent to ' + route)
	}

	const listen = (cb) => {

		callbacks.push(cb)
	}

	return { publish, listen }
}


export const initAllChannels = () => {

	const allChannels = config.get('rabbitmq.channels')

	if (Array.isArray(allChannels)) {

		for (let channelConfig of allChannels) {

			channels[channelConfig.name] = initChannel(channelConfig)
		}
	}
}

export default channels
