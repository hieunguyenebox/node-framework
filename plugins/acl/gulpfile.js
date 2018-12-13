
var MainGulp = require('../../gulp-core')

var path = require('path')

class Gulp extends MainGulp {

	constructor () {

		super()

		this.distName = 'acl'
	}

	dir () {

		return path.resolve(__dirname, './')
	}

}

module.exports = new Gulp