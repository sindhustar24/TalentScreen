/**
 * Created by sande on 3/1/2016.
 */
talentScreen.controller("takeChallangeQuizController",['$scope','$cookieStore','$localStorage','tsQuizTemplate','$state',function($scope,$cookieStore,$localStorage,tsQuizTemplate,$state){
    $scope.quizTypes=true;
    $scope.heading="TRY A CHALLENGE";
    var sessiondata=$cookieStore.get("session");
    if(!$localStorage.quizType){
        var jsonData={type:"test",token:sessiondata.token};
        tsQuizTemplate.query(jsonData).$promise.then(function (data) {
            if(data[0].status==400 || data[0].status==403 ||data[0].status==404 || data[0].status==500){
                alert(data[0].message);
            }
            else{

                $scope.quizTypes=false;
                $localStorage.quizType=data;
                $scope.types=data;


            }
        });}
    else{
        $scope.quizTypes=false;
        $scope.types=$localStorage.quizType;
    }
    $scope.selectTestType=function(value){
        $scope.subjects=[];
        $scope.quizTypes=true;
        if(value.id==1){
            $state.go("website-student.choice");

        }else if(value.id==2){
            $state.go("website-student.coding");

        }else if(value.id==3){
            $state.go("website-student.video");
        }

    };

}]);