/**
 * Created by Whitebox on 2/26/2016.
 */
talentScreen.service('loginService',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/talentscreen/login',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
});
talentScreen.service('forgotPasswordService',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'put',
            url: apiURL+'/api/v1/talentscreen/forgotpassword',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
});
talentScreen.service('referenceCodeService',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/talentscreen/forgotpassword',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
});
talentScreen.service('popularity',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/talentscreen/subjectquizcount',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;

    }
});
talentScreen.service('subjectService',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/talentscreen/subjectquizcount',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;

    }
});
talentScreen.service('latestService',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/talentscreen/subjectquizcount',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;

    }
});
talentScreen.service('passwordChangeService',function($http){
    this.postData=function(elements){
        var promise =$http({
            method: 'post',
            url: apiURL+'/api/v1/talentscreen/forgotpassword',
            contentType:"application/json",
            data:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;
    }
});
talentScreen.service('emailActivateService',function($http){
    this.postData=function(){
        var promise =$http({
            method: 'get',
            url: apiURL+'/api/v1/talentscreen/referenceCode',
            contentType:"application/json",
            params:elements
        }).then(function(response){
            return response.data;
        });
        return promise ;

    }
});

