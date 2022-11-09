const { setDefaultTimeout, When, Then, Given, Before, After, AfterStep, BeforeAll, AfterAll } = require("@cucumber/cucumber")
const fs = require("fs")
const slugify = require("slugify")
const puppeteer = require("puppeteer")

const scope = require('./scope')

setDefaultTimeout(30 * 1000)
let browser, page

const outputDir = 'output'

BeforeAll(async () => {
	counter = 0
	scope.driver = puppeteer

	let launchProperties = { 
		headless: true,
		ignoreHTTPSErrors: true,
		args: [ '--no-sandbox', '--disable-setuid-sandbox'],
		devtools: false
	}

	scope.browser = await scope.driver.launch(launchProperties)
	setDefaultTimeout(30 * 1000)
})

Before(async () => {
	scope.page = await scope.browser.newPage()
	await scope.page.setViewport({ width: 1280, height: 800 })
	await scope.page.setExtraHTTPHeaders({
		'Accept-Language': 'en-US,en;q=0.8,zh-TW;q=0.6'
	})
})

AfterStep(async function (scenario) {
	// Save screenshot of each step
	let scenario_name = slugify(scenario.pickle.name)
	let step_name = slugify(scenario.pickleStep.text)
	let result = scenario.result.status
	const stream = await scope.page.screenshot({path: `./output/screenshots/${counter}-${result}-[${scenario_name}__${step_name}].png`, fullPage: true})
	counter++
	return this.attach(stream, 'image/png')
})

AfterAll(async () => {
	if (scope.browser) {
		await scope.browser.close()
	}
})
