const reporter = require("cucumber-html-reporter")
const options ={
	theme:'bootstrap',
	jsonFile:'output/report.json',
	output:'output/html-report.html',
	reportSuiteAsScenaros: true,
	launchReport: true,
}
reporter.generate(options)