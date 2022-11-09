Feature: Search in Google

	Scenario: Verify result for google search
		Given user visits url "https://google.com"
		Then expect page title to be "Google"
		Then expect "button" with text "Google Search"
		Then enter "Fatih" to field "[name=q]"
		Then press "Enter" to field "[name=q]"
		Then after 1 second
		Then expect "h1" with text "Search Results"
		Then expect to have 1 or more elements in '[data-async-context*="query:"] > div'

	# @draft
	Scenario: Verify no result for google search
		Given user visits url "https://google.com"
		Then expect page title to be "Google"
		Then expect "button" with text "Google Search"
		Then enter "fsdiofu238r9w7esf9823uoriuwquyef8972o8euiwer" to field "[name=q]"
		Then press "Enter" to field "[name=q]"
		Then after 1 second
		Then expect "h1" with text "Search Results"
		Then expect to have 0 elements in '[data-async-context*="query:"] > div'
