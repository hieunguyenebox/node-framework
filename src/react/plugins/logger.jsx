
import env from 'config/env'

const sendLog = (type, data) => {

	helper.fetch(apis.log, {

		body: {
			type,
			...data,
			userAgent: navigator.userAgent
		}

	}).catch(err => {

	})
}

const logger = {

	error: (err, from) => {

		sendLog('error', {err, from})
	},

	info: (data, from) => {

		sendLog('info', {data, from})
	}
}


export default logger


