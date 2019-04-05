
var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	babel = require('gulp-babel'),
	path = require('path'),
	fs = require('fs');

class GulpMain {

	constructor () {
		
		this.checkWatch()

		this.babelConfig = {

			presets: ['@babel/preset-env'],
			plugins: [
		        "@babel/plugin-proposal-class-properties",
        		"@babel/plugin-proposal-object-rest-spread",
		        ["module-resolver", {
		            alias: {
		                plugins: path.resolve(process.cwd(), 'dist'),
		            }
		    	}]
			]
		}

		this.distName = ''
		this.srcPath = `${this.dir()}/**/*.js`
		console.log(this.srcPath)
	}

	isLocal () {

		return process.env.NODE_ENV === 'local'
	}

	dist () {

		return `./dist/${this.distName}`
	}

	dir () {

		return path.resolve(__dirname, './')
	}

	root () {

		return path.resolve(__dirname, '.')
	}

	checkWatch () {

		if (this.isLocal())
			this.watch = true
		else
			this.watch = false
	}

	buildSource (done) {

		const build = (cb) => {

			gulp.src([this.srcPath, '!./*/**/gulp*.js', '!./*/**/__mocks__/*.js', '!./*/**/__tests__/*.js'])
				.pipe(babel(this.babelConfig))
				.pipe(gulp.dest(this.dist()))
				.on('end', () => {

					if (typeof done === 'function')
						cb()
				})
		}

		if (this.watch) {

			build(done)
			gulp.watch(this.srcPath, build)

		} else {

			build(done)
		}
	}

	startDevServer () {

		if (this.isLocal() && this.distName === 'lib') {

			nodemon({
				watch: ['./dist', './config'],
				script: './dist/lib/core',
				env: { 'NODE_ENV': process.env.NODE_ENV }
		  	})
		}
	}

	run (done) {

		this.buildSource(done)
		this.startDevServer()
	}

}

module.exports = GulpMain

