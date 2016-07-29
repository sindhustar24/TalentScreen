/**
 * Created by Baghawath on 20-05-2016.
 */

talentScreen.service('myChallengeService',function($http){
    this.getData=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/myChallenge',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
    this.searchData=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/myChallenge',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
    this.subjectDropDown=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/subject',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
});
