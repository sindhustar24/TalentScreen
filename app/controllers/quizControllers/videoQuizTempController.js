/**
 * Created by sande on 4/19/2016.
 */
talentScreen.controller("videoQuizController",['$scope','$cookieStore','$localStorage','tsQuizTemplate','UserMedia','$timeout','$http','$sce','$location','quizResults',function($scope,$cookieStore,$localStorage,tsQuizTemplate,UserMedia,$timeout,$http,$sce,$location,quizResults){
    var count=1;
    $localStorage.videourl=[];
    $scope.loadershow=false;
    $scope.counter = 5;
    $scope.totalTimeTaken=0;
    $scope.ngTimer=true;
    $scope.count15 = true;
    $scope.questionShow=true;
    $scope.videoQuizContainer=true;
    $scope.recordingShow=true;
    $scope.timerBlink=true;
    $scope.normalTimer=false;
    $scope.playlistOpen = false;
    $scope.determinateValue=0;
    $scope.videoHeader =false;
    $scope.sidebar=true;
    $scope.headerdiv=true;
    $scope.toggle='COLLAPSE';
    $scope.mobheaderdiv=true;
    $scope.questioncountshow=true;
    $scope.panelQuestion=false;
    $scope.morediv=false;
    $scope.searchSubjectDropdown=false;
    var blobCount=1;
    var fileName;
    var recordAudio;
    var videoQuizResults=[];
    var totalTimeForQuiz=0;
    /*$scope.subjects=$localStorage.allSubjects;*/
    $scope.quizSubject=true;
    var isFirefox = !!navigator.mozGetUserMedia;
    var sessiondata=$localStorage.candidateSessionData;

    var jsonData={type:"subject",token:sessiondata.token,testtype:3};
    tsQuizTemplate.query(jsonData).$promise.then(function (data) {
        if(data[0].status==400 || data[0].status==403 ||data[0].status==404 || data[0].status==500){
            alert(data[0].message);
        }
        else{
            $localStorage.subject=data;
            $scope.subjects=data;
            $scope.quizSubject=true;}
        if(data.length >5){
            $scope.searchSubjectDropdown=true;
        }
        else{
            $scope.searchSubjectDropdown=false;
        }
    });
    $scope.selectSubjectChanged=function(value){
        $scope.levels=[];
        $scope.quizSubject=false;
        $scope.selectSubject=value.id;
        var subjects=$localStorage.subject;
        for(var i=0;i<subjects.length;i++)
        {
            if(subjects[i].id==$scope.selectSubject)
            {
                $scope.subjectName=subjects[i].name;
                $scope.iconurl=subjects[i].icon_class;
                $scope.heading="Subject";
            }

        }
        var jsonData={type:"level",token:sessiondata.token,subjectid:$scope.selectSubject,testtype:3};
        tsQuizTemplate.query(jsonData).$promise.then(function (data) {
            if(data[0].status==400 || data[0].status==403 ||data[0].status==404 || data[0].status==500){
                alert(data[0].message);
            }  else{
                $localStorage.level=data;
                $scope.levels=data;
                $scope.quizLevels=true;}
        });

    };
        $scope.timer={};
        $scope.timer.value = 1;
        $scope.timer.max = 6;
        $scope.timer.animation = "linearEase";
        $scope.timer.iterations = 20; // Accelerate animation to fit the 1 second timeout function
        $scope.timer.label = 5 +"s";
        var timeout;
        $scope.timer.start = function() {
            $scope.timer.label = $scope.counter-1 + "s";
            timeout = $timeout(function() {
                $scope.timer.value++;
                if($scope.timer.value >= $scope.timer.max) {
                    $scope.timer.value = 0;
                }
                $scope.timer.start();

            }, 1000);

        };
    $scope.selectLevelChanged=function(value){
        var level=$localStorage.level;
        $scope.selectedLevel=value.id;
        for(var i=0;i<level.length;i++){
            if(level[i].id==$scope.selectedLevel)
            {
                levelCount=level[i].count;
            }
        }
        $scope.quizLevels=false;
        $scope.quizStartAccepted=true;

    };
    $scope.onTimeout = function() {
        if($scope.counter ===  1) {
            $scope.countDown=false;
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            $scope.normalTimer=false;
            $scope.timerBlink=true;

        }
        else if($scope.counter<12){
            $scope.normalTimer=true;
            $scope.timerBlink=false;
        }

        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);

    };
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            recordAudio.stopRecording(function(url) {
                $localStorage.videourl[blobCount-1]={url:url};
                recordAudio.getDataURL(function(audioDataURL) {
                    if(blobCount <= $localStorage.quiz.questions.length){
                        postFiles(blobCount,audioDataURL);
                        blobCount++;
                    }

                });
            });

            if(count === 1){
                $scope.questions=$localStorage.quiz.questions;
                $scope.videoHeader=true;
                $scope.sidebar=false;
                $scope.headerdiv=false;
                $scope.mobheaderdiv=false;
                $scope.questioncountshow=true;
                $scope.panelQuestion=true;
                $scope.morediv=true;


            }
            if (count > 1) {
                $scope.totalTimeTaken = $scope.totalTimeTaken + ($localStorage.quiz.questions[count - 2].time - $scope.counter);
                $localStorage.quiz.questions[count - 2].timetaken=$localStorage.quiz.questions[count - 2].time - $scope.counter;
                totalTimeForQuiz = totalTimeForQuiz + $localStorage.quiz.questions[count - 2].time;
                console.log($scope.totalTimeTaken);
            }
            if (count > $scope.questions.length) {
                $scope.ngTimer=false;
                $scope.questionShow=false;
                $scope.recordingShow=false;
                $scope.normalTimer = true;
                $scope.timerBlink = true;
                $scope.count15 = true;
                window.stream.getTracks().forEach(function(track) {
                    track.stop();});
                $scope.loadershow=true;

                showLoader();
                $scope.questionShow=false;
            }
            else {
                if (window.URL) {
                    $scope.videostream = $sce.trustAsResourceUrl(window.URL.createObjectURL(window.stream));
                }
                else
                {
                    $scope.videostream = $sce.trustAsResourceUrl(window.stream);
                }
                var options = {
                    mimeType: 'video/webm', // or video/mp4 or audio/ogg
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 128000
                    // if this line is provided, skip above two
                };
                recordAudio = RecordRTC(window.stream, options);
                recordAudio.startRecording();
                $scope.counter = $localStorage.quiz.questions[count - 1].time;
                if (count == $scope.questions.length) {
                    $scope.determinateValue = 100;
                    $scope.count14 = true;
                    $scope.count15 = false;
                }
                videoQuestion(count);
                $scope.videoQuizBegin = true;
                count++;
                mytimeout = $timeout($scope.onTimeout, 1000);
            }


        }
    });

$scope.g=$scope.questionText;
    $scope.startQuiz=function(){
        UserMedia.get().then(function (response) {
            if(response.status==400){
                $scope.videoQuizContainer=false;
                $scope.videoNotSupported=true;
                $scope.startButton=false;
            }
            else{
                window.stream=response.stream;
                var options = {
                    mimeType: 'video/webm', // or video/mp4 or audio/ogg
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 128000
                    // if this line is provided, skip above two
                };
                recordAudio = RecordRTC(window.stream, options);
                recordAudio.startRecording();
                $scope.quizStartAccepted=false;
                $scope.countDown=true;
                $localStorage.quiz="";
                var jsonData={type:"questions",token:sessiondata.token,candidateid:sessiondata.data._id,testtype:3,testlevel:$scope.selectedLevel,testsubject:$scope.selectSubject,count:levelCount};
                tsQuizTemplate.show(jsonData).$promise.then(function (data){
                    $localStorage.quiz=data;
                });
                $scope.timer.start();
                mytimeout = $timeout($scope.onTimeout, 1000);
            }});



    };
    $scope.cancelQuiz=function(){
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 5;
        $timeout.cancel(mytimeout);
        $scope.countDown=false;
        $scope.quizTypes=false;
    };

    $scope.nextQuestion=function(){
        $scope.resultStatus=false;
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        $scope.toggleopen=true;
        $scope.toggle='COLLAPSE';

    };
    $scope.finishQuestion=function(){
        $scope.resultStatus=false;
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
    };
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'COLLAPSE' : 'EXPAND';
        if($scope.toggleText=='COLLAPSE'){
            $scope.classId="big";
            $scope.toggleopen=true;

        }
        else if($scope.toggleText=='EXPAND'){
            $scope.classId="small";
            $scope.toggleopen=true;

        }
    });
        $scope.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque gravida vel erat eu vestibulum. Maecenas malesuada, ante at venenatis porta, erat risus porta massa, ac vestibulum libero ex id mauris. Sed faucibus arcu eget lorem vestibulum congue. Phasellus at elit non dolor semper eleifend. Donec nec maximus purus. Donec pretium orci sed ullamcorper scelerisque. Nullam quis elit tristique, interdum eros quis, tincidunt tortor. Fusce odio enim, maximus in sollicitudin vitae, fermentum in elit. Aliquam pretium odio condimentum, fringilla risus in, mollis mi. Phasellus ullamcorper enim vehicula mi commodo laoreet.';
        $scope.limit = 200;
        $scope.lessText = "Read less";
        $scope.moreText = "Read more";
        $scope.dotsClass = "toggle-dots-grey";
        $scope.linkClass = "toggle-link-yellow";

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    function showLoader() {

        $('body').append('<div class="loader"></div>');
    }

    function removeLoader() {

        $('.loader').fadeOut(function () {
            $(this).remove();
        });
    }
    function videoQuestion(questionNumber){
        $scope.myToggle=false;
        $scope.determinateValue +=10;
        $scope.timerRunning = true;
        $scope.questionNo=questionNumber
        $scope.questionText = $scope.questions[questionNumber-1].question;
        console.log($scope.questionText.length+'jaya');

    }


    function postFiles(fileCount,audioDataURL) {
        fileName =sessiondata.data._id+fileCount+guid();
        var files = { };
        files.audio = {
            question:$scope.questionText,
            name: fileName +  '.webm' ,
            type:  'video/webm' ,
            contents: audioDataURL
        };
        videoQuizResults[fileCount-1]={"fileName":files.audio.name,"status":"pending"};
        files.isFirefox = isFirefox;
        files.type="video";
        $http({
            method: 'POST',
            url: apiURL+'/api/v1/talentscreen/video',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(files)
        }).success(function (response){
            for(var a in videoQuizResults)
            {
                if(videoQuizResults[a].fileName==response.filename){
                    videoQuizResults[a]={"fileName":files.audio.name,"status":"sucess"}
                }
                if(videoQuizResults.length== $scope.questions.length){
                    if(videoQuizResults[videoQuizResults.length-1].status=="sucess"){
                        var jsonData={type:"result",data:videoQuizResults,fileName:$localStorage.quiz._id};
                        UserMedia.post(jsonData).then(function(response){
                            function z(n) {return (n<10? '0' : '') + n;}
                            var seconds=$scope.totalTimeTaken%60;
                            var minutes=Math.floor($scope.totalTimeTaken/60);
                            var hours=Math.floor(minutes/60);

                            console.log($scope.totalTimeTaken);
                            $localStorage.quiz.timetaken=$scope.totalTimeTaken;
                            var jsonData={data:$localStorage.quiz,token:sessiondata.token};
                            quizResults.postData(jsonData).then(function(response) {
                                removeLoader();
                                var url = "#/website-student/showvideo";
                                $location.url(url);
                            });
                        });
                    }
                }
            }
        });
    }
    $scope.myVar = true;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };

}])
    .controller("demoVideoQuizController",['$scope','$cookieStore','$localStorage','$state','tsQuizTemplate','UserMedia','$timeout','$http','$sce','$location','quizResults',function($scope,$cookieStore,$localStorage,tsQuizTemplate,$state,UserMedia,$timeout,$http,$sce,$location,quizResults){
        var count=1;
        $scope.countDown=true;
        $scope.determinateValue=0;
        $scope.questions=[{
            "correctanswerornot":"N",
            "answeredornot":"N",
            "candidateanswer":null,
            "originalanswer":"8277e0910d750195b448797616e091ad",
            "answer4":"All of the above are correct.",
            "answer3":"JavaScript can be use to validate data.",
            "answer2":"JavaScript can manipulate HTML elements.",
            "answer1":"JavaScript can react to events.",
            "question":"Which of the following JavaScript cannot do?1","questionid":3997,"rowno":1},
            {
                "correctanswerornot":"N",
                "answeredornot":"N",
                "candidateanswer":null,
                "originalanswer":"0cc175b9c0f1b6a831c399e269772661",
                "answer4":"None of the mentioned",
                "answer3":"clearSchedule()",
                "answer2":"clearInterval()",
                "answer1":"clearTimeout()",
                "question":"Which method receives the return value of?setTimeout()?to cancel future invocations?2","questionid":4004,"rowno":2},

            {
                "correctanswerornot":"N",
                "answeredornot":"N",
                "candidateanswer":null,
                "originalanswer":"4a8a08f09d37b73795649038408b5f33",
                "answer4":"None of the mentioned",
                "answer3":"setInterval()",
                "answer2":"setTotaltime()",
                "answer1":"setTimeout()",
                "question":"Which function among the following lets to register a function to be invoked repeatedly after a certain time?3","questionid":3999,"rowno":3},
            {
                "correctanswerornot":"N","answeredornot":"N","candidateanswer":null,"originalanswer":"8277e0910d750195b448797616e091ad",
                "answer4":"Object.prototype",
                "answer3":"Object.add.methods(?)",
                "answer2":"Object.methods(add)",
                "answer1":"Object.add(methods)",
                "question":"How can we make methods available on all objects?","questionid":4050,"rowno":4},
            {
                "correctanswerornot":"N",
                "answeredornot":"N",
                "candidateanswer":null,
                "originalanswer":"8277e0910d750195b448797616e091ad",
                "answer4":"All of the above are correct.",
                "answer3":"JavaScript can be use to validate data.",
                "answer2":"JavaScript can manipulate HTML elements.",
                "answer1":"JavaScript can react to events.",
                "question":"Which of the following JavaScript cannot do?5","questionid":3997,"rowno":5}];

        $scope.counter = 5;
        $scope.onTimeout = function() {
            if($scope.counter ===  1) {
                $scope.countDown=false;
                $timeout.cancel(mytimeout);
                $scope.$broadcast('timer-stopped', 0);
                $timeout.cancel(mytimeout);
                $scope.normalTimer=false;
                $scope.timerBlink=true;

            }
            else if($scope.counter<12){
                $scope.normalTimer=true;
                $scope.timerBlink=false;
            }
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);

        };
        $scope.startQuiz=function(){
            UserMedia.get().then(function (response) {
                if(response.status==400){
                    $scope.videoQuizContainer=false;
                    $scope.videoNotSupported=true;
                    $scope.startButton=false;
                }
                else{
                    window.stream=response.stream;
                    $scope.quizStartAccepted=false;
                    $scope.countDown=true;
                    mytimeout = $timeout($scope.onTimeout, 1000);
                }});



        };
        $scope.startQuiz();
        $scope.$on('timer-stopped', function(event, remaining) {
            if(remaining === 0) {
                if(count === 1){
                    $scope.videoHeader=true;
                    $scope.sidebar=false;
                    $scope.headerdiv=false;
                    $scope.mobheaderdiv=false;
                    $scope.questioncountshow=true;
                    $scope.panelQuestion=true;
                    $scope.morediv=true;


                }
                if (count > $scope.questions.length) {
                    $scope.ngTimer=false;
                    $scope.questionShow=false;
                    $scope.recordingShow=false;
                    $scope.normalTimer = true;
                    $scope.timerBlink = true;
                    $scope.count15 = true;
                    window.stream.getTracks().forEach(function(track) {
                        track.stop();});
                    $scope.loadershow=true;

                    showLoader();
                    $scope.questionShow=false;
                }
                else {
                    if (window.URL) {
                        $scope.videostream = $sce.trustAsResourceUrl(window.URL.createObjectURL(window.stream));
                    }
                    else
                    {
                        $scope.videostream = $sce.trustAsResourceUrl(window.stream);
                    }
                    $scope.determinateValue +=20;
                    $scope.recordingShow=true
                    $scope.counter = 60;
                    if (count == $scope.questions.length) {
                        $scope.determinateValue = 100;
                        $scope.count14 = true;
                        $scope.count15 = false;
                    }
                    videoQuestion(count);
                    $scope.videoQuizBegin = true;
                    count++;
                    mytimeout = $timeout($scope.onTimeout, 1000);
                }


            }
        });
        function videoQuestion(questionNumber){
            $scope.myToggle=false;
            $scope.determinateValue +=0;
            $scope.timerRunning = true;
            $scope.questionNo=questionNumber
            $scope.questionText = $scope.questions[questionNumber-1].question;
        }

        $scope.finishQuestion=function(){
            $state.go('website-student.video');
        };
        $scope.cancelQuiz=function(){
            /*$scope.$broadcast('timer-stopped', $scope.counter);
            $scope.counter = 5;
            $timeout.cancel(mytimeout);
            $scope.countDown=false;
            $scope.quizTypes=false;*/
            $state.go('website-student.video');
        };
        $scope.nextQuestion=function(){
            $scope.resultStatus=false;
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            $scope.toggleopen=true;
            $scope.toggle='COLLAPSE';

        };

    }])
    .controller('introVideoController', function($scope, $q, nzTour) {

        var tour = window.tour = {
            config: {
                //dark: true,
            },
            steps: [{
                target: '#introfirstrow',
                content: "Let's take a look at some features!"
            }, {
                target: '#videoIntro',
                content: "No matter the browser size, I'm always in the right spot."
            }, {
                target: '#quesintro',
                content: "No more defining the position for every step! Try resizing your browser..."
            }, {
                target: '#progressintro',
                content: "I even know when to step aside when your browser gets too short :)"
            }, {
                target: '#timercontrol',
                content: "Promises are passed around and resolved like candy. Yes, that means asyncronous hooks for tour progression!"
            }, {
                target: '#nextintro',
                content: "Unlike intro.js, ng-joyride, and others, I WON'T relayer your DOM, shuffle your z-indexes or otherwise F up your perfectly architected UI."
            }, {
                target: '#gum-local',
                content: "Luke, come to the dark side...",
                before: function() {
                    var d = $q.defer();
                    angular.element('#vader').css('opacity', '1');
                    angular.element('#nzTour-box').addClass('dark-box');
                    d.resolve();
                    return d.promise;
                },
                after: function() {
                    var d = $q.defer();
                    angular.element('#vader').css('opacity', '0');
                    angular.element('#nzTour-box').removeClass('dark-box');
                    d.resolve();
                    return d.promise;
                }
            }]/*, {
             target: '#installation',
             content: "Installation is a breeze, and I'm only 4kb gzipped! (14kb non-zipped)"
             }, {
             target: '#usage',
             content: "Tours are simple JSON, as everything should be in life."
             }, {
             target: '#config',
             content: "Customization is a snap! These are my defaults which you can override globally or per tour."
             }, {
             target: '#api',
             content: "Easy peezy."
             }, {
             target: '#promises',
             content: "Built in promises make angular awesome, and now your tours can be just as powerful!"
             }, {
             target: '#forkme_banner',
             content: "I'll let you take it from here. <h4 style='text-align:right'><strong><3 <a href='http://github.com/nozzle'>Nozzle</a></h4> "
             }*/
        };

        $scope.start = function() {
            nzTour.start(tour);
        };

    });








