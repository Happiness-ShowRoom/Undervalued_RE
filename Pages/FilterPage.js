let SelectHelper = require("../Utilities/Select.helper.js");
let HomePage = require("../Pages/HomePage.js");
let searchCriteria = require("../TestData/SearchCriteria.json");

let FilterPage = function() {

    this.maxPriceDropDown = $(".quickMaxPrice");
    this.filtersButton = $("#wideSidepaneFilterButtonContainer"); 
    this.landButton = $("button[data-rf-test-name = 'uipt5']");
    this.applyButton = $(".applyButton");
    this.downloadLink = $("#download-and-save");

    this.filterResults = function() {

        browser.getCurrentUrl().then((result) => {
            console.log(`${result}/filter/property-type=${searchCriteria.appData.propertyType},min-price=${searchCriteria.appData.minPrice},max-price=${searchCriteria.appData.maxPrice}`);
            browser.get(`${result}/filter/property-type=${searchCriteria.appData.propertyType},min-price=${searchCriteria.appData.minPrice},max-price=${searchCriteria.appData.maxPrice},min-beds=${searchCriteria.appData.minBeds},max-beds=${searchCriteria.appData.maxBeds},min-baths=${searchCriteria.appData.minBaths},max-days-on-market=${searchCriteria.appData.maxDaysOnMarket},${searchCriteria.appData.hasGarage},status=${searchCriteria.appData.status}`);
            browser.sleep(5000);
            this.downloadLink.click();
            browser.sleep(5000);
        })
    }
};

module.exports = new FilterPage();