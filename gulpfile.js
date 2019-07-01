
var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	del = require('del'),
	fs = require('fs'),
	ts = require('gulp-typescript'),
	tslint = require('gulp-tslint'),
	tsProject = ts.createProject('tsconfig.json'),
	path = require('path');


/*****************************************
 * CONSTANT
 ****************************************/

// define source path
const SOURCE = `./src/**/*`

const IGNORE_FILES = [
	'!./*/**/__mocks__/*',
	'!./*/**/__tests__/*'
];

// define build directory
const BUILD_PATH = "./build"

const IS_LOCAL = process.env.NODE_ENV === 'development'


/*****************************************
 * FUNCTIONS
 /*****************************************/

/**
 * AUTHOR: hieunguyen
 * desc: notify nodemon to restart server
 */
const notifyNodeMon = () => {

	fs.writeFile(
		path.resolve(process.cwd(), 'restart_nodemon'),
		Date.now().toString(),
		(err) => { err && console.log(err)}
	)
}

/**
 * author: hieu nguyen
 * desc: watch and build source
 */
const buildSource = () => {

	return tsProject.src()
        .pipe(tsProject())
		.js.pipe(gulp.dest(BUILD_PATH))
		.pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report())
		.on('end', notifyNodeMon);
}

const watchBuildSource = () => {

	if (IS_LOCAL) {

		gulp.watch([SOURCE, ...IGNORE_FILES], buildSource);
	}
}

/**
 * author: hieunguyen
 * desc: start server devlopement
 */
const startDevServer = () => {

	if (IS_LOCAL) {

		nodemon({
			watch: path.resolve(process.cwd(), 'restart_nodemon'),
			script: path.resolve(process.cwd(), BUILD_PATH),
			env: { 'NODE_ENV': process.env.NODE_ENV },
		})
	}
}


/*************************************
 * RUN GULP
 *************************************/

gulp.task('default', done => {

	del([BUILD_PATH])
		.then(buildSource)
		.then(watchBuildSource)
		.then(startDevServer)
		.then(done)
})