
var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	babel = require('gulp-babel'),
	path = require('path'),
	watch = require('gulp-watch'),
	fs = require('fs');

class Gulp {

	constructor () {
		
		this.checkWatch()

		this.babelConfig = {

			presets: ['@babel/preset-env'],
			plugins: [
		        "@babel/plugin-proposal-class-properties",
        		"@babel/plugin-proposal-object-rest-spread",
		        ["module-resolver", {
		            alias: {
		                '@root': path.resolve(process.cwd(), 'dist'),
		            }
		    	}]
			]
		}

		this.distName = ''
		this.srcPath = `${this.dir()}/**/*.js`
		console.log(this.srcPath)
	}

	isLocal () {

		return process.env.NODE_ENV === 'development'
	}

	dist () {

		return path.resolve(process.cwd(), 'dist')
	}

	dir () {

		return path.resolve(__dirname, './')
	}

	checkWatch () {

		if (this.isLocal())
			this.watch = true
		else
			this.watch = false
	}

	buildSource () {

		const build = done => {

			gulp.src([this.srcPath, '!./*/**/gulp*.js', '!./*/**/__mocks__/*.js', '!./*/**/__tests__/*.js'])
				.pipe(babel(this.babelConfig))
				.pipe(gulp.dest(this.dist()))
				.on('end', () => {

					fs.writeFile(
						path.resolve(process.cwd(), 'restart_nodemon'),
						Date.now().toString(),
						() => {}
					)

					if (typeof done === 'function')
						done()
				})
		}

		if (this.watch) {

			build()
			watch(this.srcPath, build)

		} else {

			build()
		}
	}

	startDevServer (done) {

		if (this.isLocal()) {

			nodemon({
				watch: path.resolve(process.cwd(), 'restart_nodemon'),
				script: path.resolve(process.cwd(), 'dist'),
				env: { 'NODE_ENV': process.env.NODE_ENV },
				done
		  	})
		}
	}

	run (done) {

		this.buildSource()
		this.startDevServer(done)
	}

}

module.exports = new Gulp

