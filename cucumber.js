const { DEFAULT_THEME } = require('@cucumber/pretty-formatter')

module.exports = {
	default: {
		parallel: 3,
		require: [
			'step_definitions'
		],
		tags: 'not @draft',
		formatOptions: {
			theme: {
				...DEFAULT_THEME,
				'step text': 'magenta',
				"feature keyword": ["orange", "bold"],
				"scenario keyword": ["red"]
			}
		},
		format: [
			// '@cucumber/pretty-formatter',
			'progress-bar',
			'json:output/report.json',
			'html:output/report.html'
		]
	}
}