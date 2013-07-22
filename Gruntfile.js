/*
* for-life
* https://github.com/rektide/for-life
*
* Copyright (c) 2013 Matthew Fowle
* Licensed under the X.org Preferred License
*/

'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		traceur: {
			dist: {
				files: {
					'dist/for-life-traceur.js': ['for-life.js']
				}
			},
		}
	})
	grunt.loadNpmTasks('grunt-traceur')
	grunt.registerTask('default', ['traceur:dist'])
};
