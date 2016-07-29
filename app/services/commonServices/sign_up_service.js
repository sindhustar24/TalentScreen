talentScreen.service("signUpService",function($http){
    this.postData=function(elements){
        var uri= apiURL+'/api/v1/talentscreen/social/'+elements.type;
            var promise =$http({
                method: 'post',
                url: uri,
                contentType:"application/json",
                data:elements
            }).then(function(response){
                return response.data;
            });
            return promise ;
    }
});