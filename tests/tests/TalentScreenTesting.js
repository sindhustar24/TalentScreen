var LoginPage = require('../pages/Loginpage.js');
var Header = require('../pages/Header.js');
var Footer = require('../pages/Footer.js');
var Buttons = require('../pages/Buttons.js');
var SignupPage = require('../pages/SignupPage.js');
var buttons;
var login;
var header;
var footer;
var signup;
module.exports = {

    'TalentScreen Automation': function (browser) {

        header = new Header(browser);
        buttons = new Buttons(browser);
        login = new LoginPage(browser);
        footer = new Footer(browser);
        signup = new SignupPage(browser);

        //testing the header
        header.setUrl();
        header.checkForElements();

        //testing Footer
        buttons.clickOnLogo();
        footer.checkFooterVisibility();

        //testing the buttons
        buttons.clickOnSubject();
        buttons.clickOnCandidate();
        buttons.clickOnLogo();
        login.checkLogin();
        buttons.clickOnbrowseSubject();
        buttons.clickOnLogo();

        //testing the login page
        login.checkLogin();
        login.setCredentials();
        login.submit();

        //testing the signup page
        login.clickOnLogout();
        signup.clickOnSignup();
        signup.giveDetails();
        signup.clickOnCheckBoxes();
        signup.submit();
        signup.activateAccount();
        //browser.end();
    }
};