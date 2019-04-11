
var MainGulp = require('../../gulp-job')

var path = require('path')

class Gulp extends MainGulp {

	constructor () {

		super()

		this.distName = 'upload'
	}

	dir () {

		return path.resolve(__dirname, './')
	}

}

module.exports = new Gulp