/**
 * Created by Whitebox on 2/16/2016.
 */

talentScreen.controller('fbcontroller', [ '$scope','signUpService','$location','$auth','$cookieStore','loginService','$state','forgotPasswordService','referenceCodeService','passwordChangeService','emailActivateService','$localStorage', function($scope,signUpService,$location,$auth,$cookieStore,loginService,$state,forgotPasswordService,referenceCodeService,passwordChangeService,emailActivateService,$localStorage){
    var emailpassword="";
    $scope.forgotDiv=true;
    $scope.forgotEmailDiv=false;
    $scope.buttonSubmit=false;
    $scope.buttonReference=true;
    $scope.newPasswordDiv=true;
    $scope.confirmPasswordDiv=true;
    $scope.buttonChange=true;
    $scope.emailActiveDiv=false;
    $scope.emailActiveSubmitDiv=false;
    $scope.emailCodeDiv=true;
    $scope.enterDiv=true;
    $scope.loginShow=true;
    $scope.logoutShow=false;
    $scope.loginmessage=false;
    if($cookieStore.get('session')){
        $scope.loginShow=false;
        $scope.logoutShow=true;
    }
    $scope.logout=function(){
        $cookieStore.remove("session");
        $location.path('/login');
    }
    $scope.authenticate = function(provider) {

        $auth.authenticate(provider)
            .then(function(response) {
                var userdata={
                    data:response.data.Results,
                    token:response.data.Token
                };
                $cookieStore.put("session",userdata);
                $localStorage.candidateSessionData = $cookieStore.get("session");
                var url="#/website-student/dashboard";
                $location.url(url);
            })
            .catch(function(error) {
                if (error.error) {
                    console.log(error.error);
                } else if (error.data) {
                    console.log( error.status);
                } else {
                    console.log(error);
                }
            });
    };
    $scope.emplogin=function(){
        $scope.loginmessage=false;
        var jsonData={
               email:$scope.mySigninForm.username.$viewValue,
               password:MD5($scope.mySigninForm.password.$viewValue)
        };
        loginService.postData(jsonData).then(function (response) {
            var userData = {data: response.Results, token: response.Token};
            if(response.Message == '201'){
                $cookieStore.put("empSession",userData);
                $state.go('website-instructor.dashboard')
            }else if(response.Message=='202'){
                $cookieStore.put("session",userData);
                $localStorage.candidateSessionData = $cookieStore.get("session");
                $state.go('website-student.dashboard')

            }else{
                $scope.loginmessage=true;
            }
        });
    };
    $scope.forgot=function(){
        if($scope.emailIsGood) {
        var jsonData={
            type:"forgotEmail",
                email:$scope.forgotpswd.forgotEmail.$viewValue
        }

            console.log(jsonData);
        forgotPasswordService.postData(jsonData).then(function (response){
            console.log(response);
            $localStorage.verifyEmail=$scope.forgotpswd.forgotEmail.$viewValue;
            var userData={data:response.Results};
            if(response.Message == '400'){
                alert('the mail is not registered');
            }
            else{
                $state.go('forgot')
                $scope.forgotEmailDiv=true;
                $scope.buttonSubmit=true;
                $scope.forgotDiv=false;
                $scope.buttonReference=false;
            }
        });}
    }
    $scope.reference=function(){
        var jsonData={
            type:"forgot",
            referencecode:$scope.forgotpswd.referenceCode.$viewValue,
        }
        console.log(jsonData);
        referenceCodeService.postData(jsonData).then(function(response){
            console.log(response);
            var userData={data:response.Result};
           if(response.Message =='400'){
               alert('the code is not valid');
           }
            else{
               $state.go('forgot');
               $scope.forgotDiv=true;
               $scope.buttonReference=true;
               $scope.newPasswordDiv=false;
               $scope.confirmPasswordDiv=false;
               $scope.buttonChange=false;
           }
        });
    }
    $scope.change=function(){
        var jsonData={
            password:MD5($scope.forgotpswd.ePassword.$viewValue),
            email:$localStorage.verifyEmail
        }
        passwordChangeService.postData(jsonData).then(function(response){
            var userData={data:response.Result};
            if(response.Message =='400'){
                alert('the code is not valid');
            }
            else{
                $state.go('login');

            }
        });
    }
    $scope.emailActiveSubmit=function(){
        if($scope.emailIsGood) {
            var jsonData = {
                type: "email",
                emailactive: $scope.emailactivation.emailActive.$viewValue
            };
            console.log($scope.emailactivation.emailActive.$viewValue);
            forgotPasswordService.postData(jsonData).then(function (response) {
                console.log(response);
                var userData = {data: response.Result};
                if (response.Message == '400') {
                    alert('the code is not valid');
                }
                else {
                    $state.go('emailActive');
                    $scope.emailActiveDiv = true;
                    $scope.emailActiveSubmitDiv = true;
                    $scope.emailCodeDiv = false;
                    $scope.enterDiv = false;

                }
            });
        }
    }
    $scope.enter=function(){
        var jsonData={
            type:"AccountActivation",
            emailCode:$scope.emailCode
        }
        referenceCodeService.postData(jsonData).then(function(response){
            console.log(response);
            var userData={data:response.Result};
            if(response.Message =='400'){
                alert('the code is not valid');
            }
            else{
                $state.go('login');

            }
        });
    }
}]);
talentScreen.controller('employeeDetails',function($scope,$cookieStore,$location){
     sessiondata=$cookieStore.get("empSession");
    console.log(sessiondata.data.source);
    $scope.email=sessiondata.data.email;
    $scope.name=sessiondata.data.firstname;
    $scope.myimage  ='assets/images/user-default.png';
     $scope.password=function(){
        if(sessiondata.data.source=="employee"){
            return true;
        }else{
            return false;
        }
    }
    $scope.empLogout=function(){
        $cookieStore.remove("empSession");
        $location.path('/login');
    }
});


talentScreen.controller('pController', function($scope) {
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 100,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: false,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: .5,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };

    $scope.data = [
        {
            key: "Taken Time",
            y: 12
        },

        {
            key: "Total Time",
            y: 15
        },

    ];
});
