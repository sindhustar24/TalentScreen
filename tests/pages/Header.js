var jsonData = require('../../nightwatch.json');
var locators = {
    logo: 'div a img[id="logo"]',
    subjectButton: 'li a[href="#/website-courses/grid"]',
    candidateButton: 'li a[href="#/website-student/dashboard"]',
    loginButton: 'div a[href="#/login"]'
};
function Header(browser) {
    this.browser = browser;
}
Header.prototype = {
    setUrl: function () {
        this.browser.url(jsonData.url)
    },
    checkForElements: function () {
        this.browser.waitForElementVisible(locators['logo'], 10000);
        this.browser.waitForElementVisible(locators['subjectButton'], 10000);
        this.browser.waitForElementVisible(locators['candidateButton'], 10000);
        this.browser.waitForElementVisible(locators['loginButton'], 10000)
    }
};
module.exports = Header;