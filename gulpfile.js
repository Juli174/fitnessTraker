'use strict';
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	scss = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	webserver = require('gulp-webserver');

gulp.task('js', function(){
	gulp.src([
		'bower_components/angular/angular.js',
		// 'bower_components/angular-route/angular-route.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/firebase/firebase.js',
		'bower_components/angularfire/dist/angularfire.js'
		])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('builds/dev'));

	gulp.src([
		'builds/dev/app/**/*.js',
		'!builds/dev/app/**/*_test.js'
		])
	.pipe(concat('app.js'))
	
	.pipe(gulp.dest('builds/dev'));
});

gulp.task('css', function(){
	gulp.src([
		'bower_components/bootstrap/dist/css/bootstrap.css',
		'bower_components/bootstrap/dist/css/bootstrap-theme.css',
		'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
		'bower_components/angular/angular-csp.css'
		])
	.pipe(concat('theme.css'))
	.pipe(gulp.dest('builds/dev'));

	gulp.src('builds/dev/**/*.scss')
	.pipe(scss())
	.pipe(concat('app.css'))
	.pipe(gulp.dest('builds/dev'));
});

gulp.task('watch', function(){
		gulp.watch('builds/dev/app/**/*.js', ['js']);
		gulp.watch('builds/dev/app/**/*.scss', ['css']);
	});

gulp.task('webserver', function(){
	gulp.src('builds/dev')
		.pipe(webserver({
			livereload: true,
			open: true,
			port: 8012
		}));
});

gulp.task('default', [
	'js',
	'css',
	'watch',
	'webserver'
	]);