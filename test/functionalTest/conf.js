exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['createOrderTest.js', 'deleteOrderTest.js'],
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function() {}
	},
  capabilities: {
  'browserName': 'firefox'
  },
	package: "protractor-react-selector",
	onPrepare: async()=> {
		await browser.waitForAngularEnabled(false);
	}

  }
