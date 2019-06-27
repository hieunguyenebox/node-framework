
var gulp = require('gulp'),
	path = require('path'),
	fs = require('fs'),
	del = require('del'),
	Source = require('./src/gulp-build');
	
gulp.task('build', done => {

	del(['dist']).then(() => {

		Source.run()
		done()
	})
})