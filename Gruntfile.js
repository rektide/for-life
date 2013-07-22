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
		},
		sweet: {
			dist: {
				files: {
					'dist/for-life-unsweet.js': ['for-life-sweet.js']
				}
			}
		}
	})
	grunt.loadTasks('tasks')
	grunt.loadNpmTasks('grunt-traceur')
	grunt.loadNpmTasks('grunt-sweet')
	grunt.registerTask('default', ['sweet','traceur'])
};
