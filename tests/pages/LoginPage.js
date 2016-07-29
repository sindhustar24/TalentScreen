var locators = {
    loginButton: 'div a[href="#/login"]',
    userNameField: 'div input[id="username"]',
    passwordField: 'div input[id="password"]',
    submitButton: '.btn.btn-primary',
    logoutButton: 'a.navbar-btn.btn.btn.btn-primary'
};
function LoginPage(browser) {
    this.browser = browser;
}
LoginPage.prototype = {
    checkLogin: function () {
        this.browser.waitForElementVisible(locators['loginButton'], 15000);
        this.browser.click(locators['loginButton'])
    },
    setCredentials: function () {
        this.browser.waitForElementVisible(locators['userNameField'], 10000);
        this.browser.setValue('input[type=text]', 'paaaa@gmail.com');
        this.browser.setValue('input[type=password]', 'Training@')
    },
    submit: function () {
        this.browser.waitForElementVisible(locators['submitButton'], 10000);
        this.browser.click(locators['submitButton'])
    },
    clickOnLogout: function () {
        this.browser.waitForElementVisible(locators['logoutButton'], 10000);
        this.browser.click(locators['logoutButton'])
    }
};
module.exports = LoginPage;
