/**
 * Created by svelupula on 2/22/2016.
 */
talentScreen.controller('infinateScrollController', ['$scope',
    function ($scope) {
        console.log("execute");
        $scope.$broadcast('scroll.infiniteScrollcomplete');
    }]);