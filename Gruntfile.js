module.exports = function (grunt)
{
	grunt.initConfig({
		bake:
		{
			options:
			{
				// disable {{interpolation}}

				parsePattern: /##(.*?)##/g,
			},

			// conditionally bake test or release placeholders

			test:
			{
				options: { content: { test: true } },
				files: { 'format.html': 'source.html' }
			},

			release:
			{
				options: { content: { test: false } },
				files: { 'format.html': 'source.html' }
			}
		},

		watch:
		{
			source:
			{
				files: ['source.html'],
				tasks: ['default']
			}
		}
	});

	// custom task to merge a JSON-ified version of
	// format.html into format.json, then write a JSONP-ified
	// version to dist/format.js

	grunt.registerTask('compileformat', 'Compiles format.json and format.html to dist/format.js',
	function()
	{
		// merge format.html into format.json

		var formatJson = grunt.file.readJSON('format.json');
		formatJson.source = grunt.file.read('format.html');

		grunt.file.write('dist/format.js', 'window.storyFormat(' + JSON.stringify(formatJson) + ');');
	});

	grunt.loadNpmTasks('grunt-bake');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['bake:test']);
	grunt.registerTask('release', ['bake:release', 'compileformat']);
};
