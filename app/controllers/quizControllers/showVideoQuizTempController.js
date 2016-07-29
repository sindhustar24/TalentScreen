/**
 * Created by Whitebox on 5/6/2016.
 */
talentScreen.controller('HomeCtrl',
    ["$sce", "$timeout","$scope","$localStorage", function ($sce, $timeout,$scope,$localStorage) {
        var myUrl=[];
        if(videourl.length == 0 || videourl == [] || videourl == 'undefined')
        {
            $state.go("website-student.take-challange-quiz");
        }
        else{
        for(var i=0; i<videourl.length;i++)
        {

            myUrl[i]={ sources: [{src: $sce.trustAsResourceUrl(videourl[i].url), type: "video/webm"} ] };
        }
        }
        var controller = this;
        controller.state = null;
        controller.API = null;
        controller.currentVideo = 0;
        $scope.videoQuestion=$localStorage.quiz.questions[controller.currentVideo].question;

        controller.onPlayerReady = function(API) {
            controller.API = API;
        };
        controller.nxtVideo=function(){
            controller.currentVideo++;
            if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;
            controller.setVideo(controller.currentVideo);
        };
        controller.previousVideo=function(){
            controller.currentVideo--;
            if (controller.currentVideo < 0) controller.currentVideo = controller.videos.length - 1;

            controller.setVideo(controller.currentVideo);
        };
        controller.onCompleteVideo = function() {
            controller.isCompleted = true;

            controller.currentVideo++;

            if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;

            controller.setVideo(controller.currentVideo);
        };

        controller.videos =myUrl;
        controller.config = {
            preload: "none",
            autoHide: false,
            autoHideTime: 3000,
            autoPlay:true,
            sources: controller.videos[0].sources,
            theme: {
                url: "//www.videogular.com/styles/themes/default/latest/videogular.css"
            },
            plugins: {
                poster: 'images/Untitled.png'
            }
        };

        controller.setVideo = function(index) {
            controller.API.stop();
            controller.currentVideo = index;
            $scope.videoQuestion=$localStorage.quiz.questions[index].question;
            controller.config.sources = controller.videos[index].sources;
            $timeout(controller.API.play.bind(controller.API), 100);
        };
    }]
).directive("myStopButton",
    function() {
        return {
            restrict: "E",
            require: "^videogular",
            template: "<div class='iconButton' ng-click='API.stop()'>STOP</div>",
            link: function(scope, elem, attrs, API) {
                scope.API = API;
            }
        }
    }
);
