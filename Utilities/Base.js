let Base = function() {

    this.baseURL = "https://www.redfin.com";
    this.navigateTo_baseURL = function() {
        browser.get(this.baseURL);
    };
};

module.exports = new Base();