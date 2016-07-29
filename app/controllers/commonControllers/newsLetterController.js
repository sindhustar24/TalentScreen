/**
 * Created by bharti on 3/20/2016.
 */
talentScreen.controller('newsLetterController', ['$scope', 'newsLetterService',
    function ($scope, newsLetterService) {
        var email = '';
        var subscribe = '';
        $scope.newsLetterMessage = true;
        $scope.subscribeNL=function(x){
            if(x != undefined)
            {
                email = x;
                subscribe=!$scope.checked?'N':'Y';
            }
            else{
                email = $scope.nlForm.nlEmail.$viewValue;
                subscribe = 'Y';
            }
            console.log(subscribe + "   " + email);

            if(email != undefined)
              createRequest();
        }

        createRequest = function()
        {
            var jsonData =
            {
                mailid:email,
                subscribe: subscribe,
                description:"newsletter"
            }
            console.log(jsonData);
            newsLetterService.postData(jsonData).then(function (response){
                console.log(response);
                var userData={data:response.Results};
                if(response.Message == '400'){
                    alert('Please try again later');
                }
                else{
                    console.log("success");
                    $scope.newsLetterDiv = true;
                    $scope.newsLetterMessage = false;
                }
            });
        }
    }]);