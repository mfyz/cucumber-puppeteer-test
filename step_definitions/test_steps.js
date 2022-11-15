require('dotenv').config()
const { When, Then, Given, Before, AfterAll } = require("@cucumber/cucumber")
const { expect } = require("chai")

const scope = require('./scope')
const {
	getElementWithSelector,
	hasElementWithSelector,
	clickElementBySelector
} = require('../pupetteer.helpers')

// =========================================== Prerequisites ==========================================================

Given("user visits the site", async function () {
	await scope.page.goto(process.env.E2E_TEST_SITE_URL, { waitUntil: 'networkidle0' })
})

Given("user visits the page {string}", async function (path) {
	await scope.page.goto(process.env.E2E_TEST_SITE_URL + path, { waitUntil: 'networkidle0' })
})

// =========================================== Steps ==================================================================

Then('click {string} link', async (text) => {
	await clickElementWithSelector(scope.page, 'a', text)
})

Then('click {string} button', async (text) => {
	// <button>
	const buttonElem = await getElementWithSelector(scope.page, 'button', text)
	if (buttonElem) {
		await scope.page.click(buttonElem)
	}
	else {
		// <input type="button">
		const inputButtonElem = await getElementWithSelector(scope.page, 'input[type=button]', text)
		if (inputButtonElem) { await scope.page.click(inputButtonElem) }
	}
})

Then('enter {string} to field {string}', async (value, selector) => {
	const element = await getElementWithSelector(scope.page, selector)
	expect(element).not.to.be.undefined
	await element.focus()
	await element.type(value)
})

Then('press {string} to field {string}', async (value, selector) => {
	const element = await getElementWithSelector(scope.page, selector)
	expect(element).not.to.be.undefined
	await scope.page.keyboard.press('Enter') // All key names: https://bit.ly/3NSmWyB
	await scope.page.waitForTimeout(1000)
})

Then('expect to have {int} elements in {string}', async (count, selector) => {
	const elements = await scope.page.$$(selector)
	expect(elements.length).to.equal(count)
})

Then('expect to have {int} or more elements in {string}', async (count, selector) => {
	const elements = await scope.page.$$(selector)
	expect(elements.length).to.be.at.least(count)
})

Then('after {int} second(s)', async (numSeconds) => {
	await scope.page.waitForTimeout(parseInt(numSeconds) * 1000)
})

Then('expect {string} with text {string}', async (selector, expectedText) => {
	expect(await hasElementWithSelector(scope.page, selector, expectedText, true)).to.be.true
})

Then('expect page title to be {string}', async (expectedText) => {
	expect(await hasElementWithSelector(scope.page, 'title', expectedText, true)).to.be.true
})

// Examples from: https://bit.ly/3EiS5sa
