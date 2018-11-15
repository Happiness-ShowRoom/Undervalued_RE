let ListingPage = function() {
    this.estimatedPrice = $("span[data-rf-test-id = 'avmLdpPrice'] .value");
    this.taxValue = element(by.xpath("//span[contains(text(), 'Tax Assessed Value: ')]/span"));
}

module.exports = new ListingPage();
