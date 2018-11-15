let searchCriteria = require("../TestData/SearchCriteria.json");
let until = protractor.ExpectedConditions;

let HomePage = function() {

    this.searchBox = element(by.id("search-box-input"));
    this.provideCity = function() {
        browser.wait(until.visibilityOf(this.searchBox), 10000).then((result) => {
            browser.sleep(1000)
            this.searchBox.sendKeys(searchCriteria.appData.city);
            browser.sleep(1000);
            this.searchBox.sendKeys(protractor.Key.ARROW_DOWN);
            browser.sleep(1000);
            this.searchBox.sendKeys(protractor.Key.ENTER);
        });
    }
};

module.exports = new HomePage();