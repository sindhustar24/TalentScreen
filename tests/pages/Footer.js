var locators = {
    footer: '.footer-section'
};
function Footer(browser) {
    this.browser = browser;
}
Footer.prototype = {
    checkFooterVisibility: function () {
        this.browser.waitForElementVisible(locators['footer'], 10000)
    }
};
module.exports = Footer;