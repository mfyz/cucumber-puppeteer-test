const getElementWithSelector = async (page, selector, expectedText) => {
	const elements = await page.$$(selector)
	if (!expectedText) return elements[0]
	let foundElement = undefined
	for (elem of elements) {
		if (await page.evaluate(el => el.textContent, elem) === expectedText) {
			foundElement = elem
		}
		break
	}
	return foundElement
}

module.exports = {
	getElementWithSelector,
	hasElementWithSelector: async (page, selector, text, waitFor) => {
		if (waitFor) {
			await page.waitForSelector(selector)
		}
		const element = getElementWithSelector(page, selector, text)
		return element !== undefined
	},
	waitAndGetElementWithSelector: async (page, selector, text) => {
		await page.waitForSelector(selector)
		return getElementWithSelector(page, selector, text)
	},
	clickElementBySelector: async (page, selector, text) => {
		const element = await getElementWithSelector(page, selector, text)
		return await page.click(element)
	}
}