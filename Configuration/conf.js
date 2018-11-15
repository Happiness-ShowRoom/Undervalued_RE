let SpecReporter = require("jasmine-spec-reporter").SpecReporter;
let HtmlReporter = require("protractor-beautiful-reporter");

exports.config = {
    
    framework: 'jasmine',

    directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {

            args: [ "--headless", "--disable-gpu", "--window-size=800,600" ],

            prefs: {
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': process.cwd() + '/../TestData'
                }
            }
        }
    },

    specs: ['../Tests/FindUndervalued.spec.js'],

    onPrepare: function() {

        browser.driver.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true,
            showstack: true
        }));
        // Add a screenshot and store to 'report/screenshots'
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: '../Reports/screenshots',
            preserveDirectory: false,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docName: 'UndervaluedRE_trace.html'
        }).getJasmine2Reporter());
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 3600000,
        print: function() {}
    }
};
