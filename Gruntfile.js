module.exports = function ( grunt ) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		/*
		 * WATCH
		 */
		watch: {
			css: {
				files: [
					'<%= pkg.assetsFolder %>/sass/**/**/*.scss'
				],
				tasks: [
					'sass:dist',
					'autoprefixer',
					'css_mqpacker',
					'stripmq',
					'pixrem',
					'cssmin'
				]
			},
			js: {
				files: [
					'<%= pkg.assetsFolder %>/js/**/*.js'
				],
				tasks: [
					'concat',
					'uglify'
				]
			}
		},


		/*
		 * CSS
		 */
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'<%= pkg.assetsFolder %>/_build/css/style.css': '<%= pkg.assetsFolder %>/sass/style.scss',
					'<%= pkg.assetsFolder %>/_build/css/ie.css': '<%= pkg.assetsFolder %>/sass/ie.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [ 'last 4 version' ]
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: '<%= pkg.assetsFolder %>/_build/css/style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css'
			}
		},
		css_mqpacker: {
			options: {
				map: false,
			},
			main: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/'
			}
		},
		stripmq: {
			options: {
				width: '62.5em',
				type: 'screen'
			},
			all: {
				files: {
					'<%= pkg.assetsFolder %>/_build/css/ie.css': [ '<%= pkg.assetsFolder %>/_build/css/ie.css' ]
				}
			}
		},
		pixrem: {
			options: {
				rootvalue: '62.5%',
				replace: true
			},
			dist: {
				src: '<%= pkg.assetsFolder %>/_build/css/ie.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/ie.css'
			}
		},
		cssmin: {
			main: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/',
				ext: '.min.css'
			},
			ie: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'ie.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/',
				ext: '.min.css'
			}
		},


		/*
		 * JS
		 */
		 concat: {
            main: {
                src: [
                	'<%= pkg.assetsFolder %>/js/lib/*.js',
                	'<%= pkg.assetsFolder %>/js/components/*.js',
                	'<%= pkg.assetsFolder %>/js/*.js'
                ],
                dest: '<%= pkg.assetsFolder %>/_build/js/main.min.js'
            },
            head: {
				src: [
					//'<%= pkg.assetsFolder %>/_components/lazysizes/lazysizes.js',
					'<%= pkg.assetsFolder %>/_components/modernizr/modernizr.js'
				],
				dest: '<%= pkg.assetsFolder %>/_build/js/head.js'
			}

        },
        uglify: {
            main: {
                src: '<%= pkg.assetsFolder %>/_build/js/main.min.js',
                dest: '<%= pkg.assetsFolder %>/_build/js/main.min.js'
            },
            head: {
				files: {
					'<%= pkg.assetsFolder %>/_build/js/head.js': '<%= pkg.assetsFolder %>/_build/js/head.js'
				}
			}
        },



		/*
		 * IMAGES
		 */
		svg2png: {
			all: {
				files: [{
					cwd: '<%= pkg.assetsFolder %>/img/svg',
					src: [ '*.svg' ],
					dest: '<%= pkg.assetsFolder %>/_build/img/svg'
				}]
			}
		},
		svgmin: {
			options: {
				plugins: [
					{ removeViewBox: true },
					{ removeUselessStrokeAndFill: false },
					{ removeEmptyAttrs: false }
				]
			},
			all: {
				files: [{
					expand: true,
					cwd: '<%= pkg.assetsFolder %>/img/svg',
					src: '*.svg',
					dest: '<%= pkg.assetsFolder %>/_build/img/svg',
					ext: '.svg'
				}]
			}
		},
		imageoptim: {
			all: {
				options: {
					jpegMini: false,
					imageAlpha: false,
					quitAfter: false
				},
				src: [
					//TODO move images to _build
					'<%= pkg.assetsFolder %>/_build/img/content/*/*.{png,gif,jpg}',
					'<%= pkg.assetsFolder %>/_build/img/svg/*.png'
				]
			}
		}
	});


	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-css-mqpacker' );
	grunt.loadNpmTasks( 'grunt-stripmq' );
	grunt.loadNpmTasks( 'grunt-pixrem' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.loadNpmTasks( 'grunt-svg2png' );
	grunt.loadNpmTasks( 'grunt-svgmin' );
	grunt.loadNpmTasks( 'grunt-imageoptim' );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'dev', [
		'css:dev',
		'js:dev',
		'watch'
	]);

	grunt.registerTask( 'build', [
		'css:build',
		'js:build',
		'images'
	]);


	grunt.registerTask( 'css:dev', [
		'sass',
		'autoprefixer',
		'css_mqpacker',
		'stripmq',
		'pixrem'
	]);

	grunt.registerTask( 'js:dev', [
		'concat'
	]);

	grunt.registerTask( 'css:build', [
		'css:dev',
		'cssmin'
	]);

	grunt.registerTask( 'js:build', [
		'js:dev',
		'uglify'
	]);

	grunt.registerTask( 'images', [
		'svg2png',
		'svgmin',
		'imageoptim'
	]);
};