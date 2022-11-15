Feature: Homepage renders

	Scenario: Verify homepage content
		Given user visits the site
		Then expect page title to be "Inside & Online Sales Natural Food Brokers - Marketnative"
		Then expect "a" with text "Search"
		Then expect "a" with text "Login"
		Then expect "a" with text "Sign-up"
		Then expect "h1" with text "Top Brands"
		Then expect to have 10 or more elements in '#top-brands-carousel .col-md-4.col-xs-12.col-sm-4'
		Then expect "h1" with text "Featured Products"
		Then expect to have 8 elements in '.main-feature .col-md-3.count-8.col-xs-12.col-sm-3'
		Then expect "h1" with text "News & Events"
		Then expect to have 3 or more elements in '#news-carousel .col-md-3.col-xs-12.col-sm-3'
		Then expect "h1" with text "OurVideo Gallery"
		Then expect to have 3 or more elements in '#video-gallery-carousel .col-md-4.col-xs-12.col-sm-4'
