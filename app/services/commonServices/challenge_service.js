/**
 * Created by Baghawath on 20-05-2016.
 */

talentScreen.service('myChallengeService',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'get',
            /*url: apiURL+'/api/v1/myChallenge?quiztype=video',*/
            url: apiURL+'/api/v1/myChallenge?page=1&count=1',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
});
