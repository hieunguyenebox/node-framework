
import config from 'backend/config'

var fs = require('fs'),
	path = require('path')

class Log {

	constructor () {

		this.pathDir = process.env.LOG_DIR
	}

	info (content, pretty = false) {

		this.writeLog('info', content, pretty)

	}

	error (content, pretty = false) {

		if (content && content.stack)
			content = content.stack

		this.writeLog('error', content, pretty)
	}

	debug (content, pretty = false) {

		this.writeLog('debug', content, pretty)
	}

	getTime () {

		const date = new Date

		return date.toLocaleString()
	}

	getFileName () {

		const date = new Date

		return date.toLocaleDateString().replace(/\//g,'-')
	}

	createLogDir () {

		if (!fs.existsSync(this.pathDir))
			fs.mkdirSync(this.pathDir)
	}

	writeLog (type, content, pretty) {

		if (content && content.stack)
			content = content.stack;

		this.createLogDir()

		const path = `${this.pathDir}/${type}-${this.getFileName()}.log`

		content = pretty ? JSON.stringify(content, null, 2) : JSON.stringify(content)

		fs.appendFile(path, `- ${this.getTime()}: ${content}\n`, err => err && console.log(err))
	}
}

export default new Log