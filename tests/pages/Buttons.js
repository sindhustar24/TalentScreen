var locators = {
    logo: 'div a img[id="logo"]',
    subjectButton: 'li a[href="#/website-courses/grid"]',
    candidateButton: 'li a[href="#/website-student/dashboard"]',
    loginButton: 'div a[href="#/login"]',
    browseSubjectsButton: 'a.btn.btn-lg.btn-primary'
};
function Buttons(browser) {
    this.browser = browser;
}
Buttons.prototype = {
    clickOnLogo: function () {
        this.browser.waitForElementVisible(locators['logo'], 10000);
        this.browser.click(locators['logo'])
    },
    clickOnSubject: function () {
        this.browser.click(locators['subjectButton'])
    },
    clickOnCandidate: function () {
        this.browser.click(locators['candidateButton'])
    },
    clickOnbrowseSubject: function () {
        this.browser.click(locators['browseSubjectsButton'])
    }
};
module.exports = Buttons;