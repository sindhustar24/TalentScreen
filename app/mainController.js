/**
 * Created by svelupula on 2/17/2016.
 */
talentScreen.controller('AppCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.app = {
            settings: {
                htmlClass: '',
                bodyClass: ''
            }
        };
        $scope.$state = $state;

    }]);
talentScreen.controller("sessionController",['$scope','$cookieStore','$location',function($scope,$cookieStore,$location){
    var htmlClass = {
        website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
        websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
        websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
        websiteLogin: 'hide-sidebar ls-bottom-footer',
        websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
        appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
        appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
    };
    if(!$cookieStore.get('session')){
        $location.url("/login");
    }

    $scope.app.settings.htmlClass = htmlClass.website;
    $scope.app.settings.bodyClass = '';
}]);
talentScreen.controller("empSessionController",['$scope','$cookieStore','$location',function($scope,$cookieStore,$location){
    var htmlClass = {
        website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
        websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
        websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
        websiteLogin: 'hide-sidebar ls-bottom-footer',
        websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
        appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
        appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
    };
    if(!$cookieStore.get('empSession')){
        $location.url("/login");
    }
    $scope.app.settings.htmlClass = htmlClass.website;
    $scope.app.settings.bodyClass = '';
}]);
