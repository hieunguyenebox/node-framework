
var gulp = require('gulp'),
	path = require('path'),
	fs = require('fs'),
	del = require('del'),
	Backend = require('./src/backend/gulp-build'),
	React = require('./src/react/gulp-build');

gulp.task('build', done => {

	del(['dist']).then(() => {

		Backend.run()
		React.run()
		done()
	})
})