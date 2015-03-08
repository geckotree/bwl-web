module.exports = function( grunt ) {

	grunt.initConfig({
		bump: {
			options: {
				files: [ 'packages.json' ],
				commit: true,
				commitFiles: [ '-a' ],
				createTag: true,
				push: true,
				pushTo: 'origin'
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-bump' );

};
