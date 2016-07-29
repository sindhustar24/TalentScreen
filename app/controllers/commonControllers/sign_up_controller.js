talentScreen.controller("signUpController",['$scope','signUpService','$location','referenceCodeService','$state',function($scope,signUpService,$location,referenceCodeService,$state){
    $scope.signUpForm=false;
    $scope.Message=true;
    //$scope.formAllGood = function () {
    //    return ($scope.emailIsGood && $scope.passwordGood && $scope.passwordCGood)
    //};

    var formAllGood = function () {
        return ($scope.emailIsGood && $scope.passwordGood && $scope.passwordCGood)
    };

    $scope.signUp=function() {

        //if email/passord is not good, prevent sign in
        if (!formAllGood){
            return false;
        }

        var pwd=$scope.mySignUpForm.ePassword.$viewValue;
        var md5Value =MD5(pwd);
        var check=$scope.candidateCheckBox;

        if(!check){
            var jsonData = {
                type: "candidate",
                name: "anonymous",
                email: $scope.mySignUpForm.emailAddress.$viewValue,
                password: md5Value,
                 flag:'N'

            }
            signUpService.postData(jsonData).then(function (responce) {
                alert("your sucessfully Register please log in");

                $scope.signUpForm=true;
                $scope.Message=false;
               /* $location.url("/login");*/
            });
        }else{
                var jsonData = {
                    type: "employee",
                   firstname:"anonymous",
                    /*lastname: $scope.mySignUpForm.lastName.$viewValue,*/
                    email: $scope.mySignUpForm.emailAddress.$viewValue,
                    password: md5Value,
                    flag:'N'

                }
                signUpService.postData(jsonData).then(function (responce) {
                    alert("your sucessfully Register please log in");
                    /*$location.url("/login");*/
                    $scope.signUpForm=true;
                    $scope.Message=false;
                });
        }
    };
    $scope.emailActiveReferenceSubmit=function(){
        alert('hi this active email');
        var jsonData={
            type:"EmailActivation",
            emailActiveReference:$scope.emailActiveReference
        }
        referenceCodeService.postData(jsonData).then(function(response){

            var userData={data:response.Result};
            if(response.Message =='400'){
                alert('the code is not valid');
            }
            else{
                $state.go('login');

            }
        });
    };
}]);
talentScreen.controller('socialcontroller',function($scope,$cookieStore,$location,$localStorage,tsQuizTemplate,myChallengeService){

    if($cookieStore.get("session")){
    var sessiondata=$cookieStore.get("session");
        if(!$localStorage.quizType){
        var jsonData={type:"test",token:sessiondata.token};
        tsQuizTemplate.query(jsonData).$promise.then(function (data) {
            $localStorage.quizType=data;
        });}
        candidateid=sessiondata.data._id;
        if(sessiondata.data.source_details.picture){
    $scope.myimage=sessiondata.data.source_details.picture;}
        else {
            $scope.myimage  ='assets/images/user-default.png';
        }
    $scope.name=sessiondata.data.name;
        $scope.email=sessiondata.data.source_details.email;
    var newname=$scope.name.split(' ');
    $scope.newname=newname[0];
        $scope.newnames=newname[1];
        $scope.password=function(){
            if(sessiondata.data.source=="talentscreen"){
                return true;
            }else{
                return false;
            }
        }
        $scope.linkedinorNot=function(){
            if(sessiondata.data.source=="linkedin"){
                return false;
            }
            else{
                return true;
            }
        }
    }
    else {
        $scope.myimage='images/people/110/guy-6.jpg';
        $scope.name="Bills Smith";
        var newname=$scope.name.split(' ');
        $scope.newname=newname[0];
    }
    $scope.logout=function(){
        $cookieStore.remove("session");
        $location.path('/login');
    }
    myChallengeService.subjectDropDown().then(function(data){
        $localStorage.allSubjects=data;
    });

});
