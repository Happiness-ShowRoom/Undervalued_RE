var SelectHelper = function(selector){
    this.webElement = element(selector);
}

SelectHelper.prototype.getOptions = function() {
    return this.webElement.all(by.tagName('option'));
}

SelectHelper.prototype.getSelectedOptions = function() {
    return this.webElement.all(by.css('option[selected="selected"]'));
}

SelectHelper.prototype.selectByValue = function(value) {
    return this.webElement.all(by.css('option[value="'+ value +'"]')).click();
}

SelectHelper.prototype.selectByText = function(text) {
    return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();
}

SelectHelper.prototype.selectByPartialText = function(text) {
    return this.webElement.all(by.cssContainingText('option', text)).click();
}

module.exports = SelectHelper;