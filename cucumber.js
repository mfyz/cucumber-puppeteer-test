const runParallel = process.env.RUN_PARALLEL !== undefined

module.exports = {
	default: {
		parallel: runParallel ? 3 : 1,
		require: [
			'step_definitions'
		],
		tags: 'not @draft',
		formatOptions: {
			// For @cucumber/pretty-formatter
			colorsEnabled: true,
			theme: {
				'feature keyword': ['bgYellow', 'black', 'bold'],
				'feature name': ['yellow', 'bold'],
				'step text': ['gray'],
				'scenario keyword': ['magenta'],
				'scenario name': ['magentaBright'],
				'step keyword': ['blueBright'],
			}
		},
		format: [
			...(runParallel ? [
				'progress-bar'
			] : [
				'@cucumber/pretty-formatter'
			]),
			'json:output/report.json',
			'html:output/report.html'
		]
	}
}