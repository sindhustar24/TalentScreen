var locators = {
    signupButton: '.navbar-btn.btn.btn-success',
    emailIDField: '#emailAddress',
    passwordField: '#ePassword',
    confirmPasswordField: '#mPassword',
    termsCheckBox: '#terms',
    employeeCheckBox: '#candidate',
    createAccount: 'div input.btn.btn-primary',
    referenceCode: '#emailActiveReference',
    referenceCodeSubmit: 'div a[ng-click="emailActiveReferenceSubmit()"]'

};
function SignupPage(browser) {
    this.browser = browser;
}
SignupPage.prototype = {
    clickOnSignup: function () {
        this.browser.waitForElementVisible(locators['signupButton'], 10000);
        this.browser.click(locators['signupButton'])
    },
    giveDetails: function () {
        this.browser.waitForElementVisible(locators['emailIDField'], 10000);
        this.browser.setValue('input[type=text]', 'p.venugopalarao222@gmail.com');
        this.browser.waitForElementVisible(locators['passwordField'], 10000);
        this.browser.setValue('input[id=ePassword]', 'Training@');
        this.browser.waitForElementVisible(locators['confirmPasswordField'], 10000);
        this.browser.setValue('input[input[id=mPassword]]', 'Training@')

    },
    clickOnCheckBoxes: function () {
        this.browser.click(locators['employeeCheckBox']);
        this.browser.click(locators['termsCheckBox'])
    },

    submit: function () {
        this.browser.waitForElementVisible(locators['createAccount'], 10000);
        this.browser.click(locators['createAccount'])
    },
    activateAccount: function () {
        this.browser.waitForElementVisible(locators['referenceCode'], 10000);
        this.browser.pause(5000);
        this.browser.click(locators['referenceCodeSubmit'])
    }

};
module.exports = SignupPage;