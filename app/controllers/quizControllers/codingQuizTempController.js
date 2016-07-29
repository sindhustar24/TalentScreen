/**
 * Created by sande on 4/19/2016.
 */
talentScreen.controller("codingQuizController", ['$scope', '$cookieStore', '$localStorage', 'tsQuizTemplate', 'codeCompiler', '$timeout', 'quizResults', function ($scope, $cookieStore, $localStorage, tsQuizTemplate, codeCompiler, $timeout, quizResults) {
    $scope.counter = 5;
    var count = 1;
    $scope.count15 = true;
    $scope.totalTimeTaken = 0;
    $scope.quizSubject = true;
    var sessiondata = $localStorage.candidateSessionData;
    var totalTimeForCodingQuiz = 0;
    var totalTimeForQuiz = 0;
    $scope.codingHeader = true;
    $scope.questioncountshow = true;
    $scope.determinateValue = 0;
    $scope.sidebar = true;
    $scope.morediv = false;
    $scope.searchSubjectDropdown = false;
    var jsonData = {type: "subject", token: sessiondata.token, testtype: 2};
    tsQuizTemplate.query(jsonData).$promise.then(function (data) {
        if (data[0].status == 400 || data[0].status == 403 || data[0].status == 404 || data[0].status == 500) {
            alert(data[0].message);
        }
        else {
            var dat = [{name: "ram", id: 1}, {name: "ram1", id: 1}, {name: "ram2", id: 1}, {
                name: "ram3",
                id: 1
            }, {name: "ram4", id: 1}, {name: "ram5", id: 1}]
            console.log(data);
            $scope.quizSubject = true;
            $localStorage.subject = data;

            if (data.length > 5) {
                $scope.searchSubjectDropdown = true;
            }
            else {
                $scope.searchSubjectDropdown = false;
            }
            $scope.subjects = data;
        }
    });

    $scope.selectSubjectChanged = function (value) {
        $scope.levels = [];
        $scope.quizSubject = false;
        $scope.selectSubject = value.id
        var subjects = $localStorage.subject;
        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].id == $scope.selectSubject) {
                $scope.subjectName = subjects[i].name;
                $scope.iconurl = subjects[i].icon_class;
                $scope.heading = "Subject";
            }

        }
        console.log($scope.selectSubject.id);
        var jsonData = {type: "level", token: sessiondata.token, subjectid: $scope.selectSubject, testtype: 2};
        tsQuizTemplate.query(jsonData).$promise.then(function (data) {
            if (data[0].status == 400 || data[0].status == 403 || data[0].status == 404 || data[0].status == 500) {
                alert(data[0].message);
            } else {
                $localStorage.level = data;
                $scope.levels = data;
                console.log(data);
                $scope.quizLevels = true;
            }
        });

    };


    $scope.selectLevelChanged = function (value) {
        $scope.selectedLevel = value.id;
        var level = $localStorage.level;
        for (var i = 0; i < level.length; i++) {
            if (level[i].id == value.id) {
                levelCount = level[i].count;
            }
        }
        var jsonData = {type: "language", token: sessiondata.token, subjectid: $scope.selectSubject};
        tsQuizTemplate.query(jsonData).$promise.then(function (data) {
            console.log(data[0]);
            $scope.language = data[0].name;
            $scope.languageid = data[0].id;
            $scope.codeTextTemplate = data[0].template;
        });
        $scope.quizLevels = false;
        $scope.quizStartAccepted = true;

    };
    $scope.cancelQuiz = function () {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 5;
        $timeout.cancel(mytimeout);
        $scope.countDown = false;
        $scope.quizTypes = false;
        $scope.videoquizcount = false;
    };
    $scope.nextQuestion = function () {
        $scope.resultStatus = false;
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
    };
    $scope.finishQuestion = function () {
        $scope.resultStatus = false;
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
    };
    $scope.compile = function () {
        codingCompilation(count);
    };
    $scope.startQuiz = function () {
        $scope.quizStartAccepted = false;
        $scope.countDown = true;
        $localStorage.quiz = "";
        var jsonData = {
            type: "questions",
            token: sessiondata.token,
            candidateid: sessiondata.data._id,
            testtype: 2,
            testlevel: $scope.selectedLevel,
            testsubject: $scope.selectSubject,
            count: levelCount
        };
        tsQuizTemplate.show(jsonData).$promise.then(function (data) {
            $localStorage.quiz = data;
        });
        $scope.timer.start();
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.onTimeout = function () {
        if ($scope.counter === 1) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            $scope.normalTimer = false;
            $scope.timerBlink = true;
            $scope.sidebar = false;
            $scope.morediv = true;
        }
        else if ($scope.counter < 12) {
            $scope.normalTimer = true;
            $scope.timerBlink = false;
        }

        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);

    };
    $scope.$on('timer-stopped', function (event, remaining) {
        $scope.codingHeader = false;
        $scope.questioncountshow = false;
        if ($scope.resultStatus) {
            $scope.totalTimeTaken = $scope.totalTimeTaken + ($localStorage.quiz.questions[count - 2].time - $scope.counter);
            $localStorage.quiz.questions[count - 2].timetaken=$localStorage.quiz.questions[count - 2].time - $scope.counter;
            totalTimeForCodingQuiz = totalTimeForCodingQuiz + $localStorage.quiz.questions[count - 2].time;
            $scope.resultStatus = false;
            $scope.counter = 10;
            $scope.codingQuizBegin = false;
            codingCompilation(count - 1);
            mytimeout = $timeout($scope.onTimeout, 1000);

        } else {
            $scope.questions = $localStorage.quiz.questions;
            if (remaining === 0) {
                $scope.countDown = false;

                if (count > $scope.questions.length) {
                    codingQuizValidation()
                }
                else {
                    if (count > 1) {
                        if (!$scope.resultStatus && $scope.counter > 1) {
                            $scope.totalTimeTaken = $scope.totalTimeTaken + ($localStorage.quiz.questions[count - 2].time - $scope.counter);
                            $localStorage.quiz.questions[count - 2].timetaken=$localStorage.quiz.questions[count - 2].time - $scope.counter;
                            totalTimeForQuiz = totalTimeForQuiz + $localStorage.quiz.questions[count - 2].time;

                        }
                    }
                    $scope.counter = $localStorage.quiz.questions[count - 1].time;
                    $scope.codingQuizBegin = true;
                    $scope.cmModel = null;
                    var lang = $scope.language;
                    $scope.cmOption = {
                        lineNumbers: true,
                        lineWrapping: true,
                        indentWithTabs: true,
                        theme: 'twilight',
                        electricChars: true,
                        mode: lang.toLowerCase(),
                        onLoad: function (_cm) {
                            $scope.modeChanged = function () {
                                _cm.setOption("mode", lang.toLowerCase());
                            };
                            $scope.codemirrorLoaded = function (_editor) {
                                var _doc = _editor.getDoc();
                                _editor.clear();
                                _editor.focus();
                                _doc.markClean();
                            };

                        }
                    };
                    $scope.cmModel = "//write your code here...\n";
                    codingQuestion(count);
                    if (count == $scope.questions.length) {
                        $scope.determinateValue = 100;
                        $scope.count14 = true;
                        $scope.count15 = false;
                    }
                    $scope.codingQuizBeginresult = true;
                    count++;
                    $scope.resultStatus = true;
                    mytimeout = $timeout($scope.onTimeout, 1000);
                }


            }
        }
    });
    function codingQuestion(questionNumber) {
        $scope.determinateValue += 10;
        $scope.isSomething = true;
        $scope.questionNo = questionNumber;
        $scope.questionText = $scope.questions[questionNumber - 1].question;
        $scope.cmModel = $scope.codeTextTemplate;
        $scope.info = null;
        $scope.result = null;
    }

    function codingCompilation(count) {
        var data1 = {
            language: $scope.languageid,
            editor: 1,
            content: $scope.cmModel
        };
        codeCompiler.postData(data1).then(function (response) {

            message = '';

            if (response.data.Warnings) {
                message += 'Warnings: ' + response.data.Warnings + '\n';
            }

            if (response.data.Errors) {
                message += 'Errors: ' + response.data.Errors + '\n';
            }

            if (response.data.Stats) {
                message += 'Errors: ' + response.data.Stats + '\n';
            }

            $scope.result = response.data.Result;
            $scope.info = message;
            $localStorage.quiz.questions[count - 1].candidateanswer = $scope.cmModel;
            $localStorage.quiz.questions[count - 1].compiledOrNot = "Y";
            $localStorage.quiz.questions[count - 1].result = response.data.Result;
            $localStorage.quiz.questions[count - 1].error = message;
            if (response.data.Result) {
                $localStorage.quiz.questions[count - 1].atempted = "Y";
            }
        });
    }
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
    function codingQuizValidation() {
        $scope.questioncountshow = true;
        var attemptedcodingQuestion = 0;
        for (var i = 0; i < $localStorage.quiz.questions.length; i++) {
            if ($localStorage.quiz.questions[i].atempted == "Y") {
                attemptedcodingQuestion++;
            }
        }
        function z(n) {
            return (n < 10 ? '0' : '') + n;
        }

        var seconds = $scope.totalTimeTaken % 60;
        var minutes = Math.floor($scope.totalTimeTaken / 60);
        var hours = Math.floor(minutes / 60);
        $localStorage.quiz.timetaken = $scope.totalTimeTaken;
        $localStorage.quiz.atempted = attemptedcodingQuestion;
        var jsonData = {data: $localStorage.quiz, token: sessiondata.token};
        quizResults.postData(jsonData).then(function (response) {
            $scope.codingQuizBegin = false;
            $scope.codingQuizBeginresult = false;
            var jsonData = {
                totalTime: z(Math.floor(Math.floor(totalTimeForQuiz / 60) / 60)) + ':' + z(Math.floor(totalTimeForQuiz / 60)) + ':' + z(totalTimeForQuiz % 60),
                totalTimeTaken: response.timetaken,
                atemptedQuestions: response.atempted,
                totalQuestions: $localStorage.quiz.questions.length
            };


        });
    }

    $scope.myVar = true;
    $scope.toggle = function () {
        $scope.myVar = !$scope.myVar;
    };
}]).controller("democodingQuizController", ['$scope', '$timeout', 'codeCompiler', '$state', function ($scope, $timeout, codeCompiler, $state) {
    $scope.counter = 5;
    $scope.countDown = true;
    $scope.count15 = true;
    $scope.codingQuizBegin = true;
    var count = 1;
    var mytimeout;
    $scope.determinateValue = 0;
    $scope.questions = [{
        "correctanswerornot": "N",
        "answeredornot": "N",
        "candidateanswer": null,
        "originalanswer": "8277e0910d750195b448797616e091ad",
        "answer4": "All of the above are correct.",
        "answer3": "JavaScript can be use to validate data.",
        "answer2": "JavaScript can manipulate HTML elements.",
        "answer1": "JavaScript can react to events.",
        "question": "Which of the following JavaScript cannot do?1", "questionid": 3997, "rowno": 1
    },
        {
            "correctanswerornot": "N",
            "answeredornot": "N",
            "candidateanswer": null,
            "originalanswer": "0cc175b9c0f1b6a831c399e269772661",
            "answer4": "None of the mentioned",
            "answer3": "clearSchedule()",
            "answer2": "clearInterval()",
            "answer1": "clearTimeout()",
            "question": "Which method receives the return value of?setTimeout()?to cancel future invocations?2",
            "questionid": 4004,
            "rowno": 2
        },

        {
            "correctanswerornot": "N",
            "answeredornot": "N",
            "candidateanswer": null,
            "originalanswer": "4a8a08f09d37b73795649038408b5f33",
            "answer4": "None of the mentioned",
            "answer3": "setInterval()",
            "answer2": "setTotaltime()",
            "answer1": "setTimeout()",
            "question": "Which function among the following lets to register a function to be invoked repeatedly after a certain time?3",
            "questionid": 3999,
            "rowno": 3
        },
        {
            "correctanswerornot": "N",
            "answeredornot": "N",
            "candidateanswer": null,
            "originalanswer": "8277e0910d750195b448797616e091ad",
            "answer4": "Object.prototype",
            "answer3": "Object.add.methods(?)",
            "answer2": "Object.methods(add)",
            "answer1": "Object.add(methods)",
            "question": "How can we make methods available on all objects?",
            "questionid": 4050,
            "rowno": 4
        },
        {
            "correctanswerornot": "N",
            "answeredornot": "N",
            "candidateanswer": null,
            "originalanswer": "8277e0910d750195b448797616e091ad",
            "answer4": "All of the above are correct.",
            "answer3": "JavaScript can be use to validate data.",
            "answer2": "JavaScript can manipulate HTML elements.",
            "answer1": "JavaScript can react to events.",
            "question": "Which of the following JavaScript cannot do?5", "questionid": 3997, "rowno": 5
        }];
    $scope.compile = function () {
        codingCompilation(count);
    };

    var callAtTimeout = function () {
        if ($scope.counter === 1) {
            $scope.$broadcast('timer-stopped', 0);
            $scope.normalTimer = false;
            $scope.timerBlink = true;
        }
        else if ($scope.counter < 12) {
            $scope.normalTimer = true;
            $scope.timerBlink = false;
            $scope.counter--;
            mytimeout = $timeout(callAtTimeout, 1000);
        } else {
            $scope.counter--;
            mytimeout = $timeout(callAtTimeout, 1000);
        }

    }
    mytimeout = $timeout(callAtTimeout, 1000);
    $scope.$on('timer-stopped', function (event, remaining) {
        $timeout.cancel(mytimeout);
        $scope.countDown = false;
        $scope.quizBegin = true;
        codingCompilation(count - 1);
        $scope.determinateValue +=20;
        if (remaining === 0) {
            if (count == $scope.questions.length) {
                $scope.determinateValue = 100;
                $scope.count14 = true;
                $scope.count15 = false;
            }
            if (count > $scope.questions.length) {
                finishDemo();
            }
            $scope.counter = 60;
            codingQuestion(count);
            var lang = 'javascript';
            $scope.cmOption = {
                lineNumbers: true,
                lineWrapping: true,
                indentWithTabs: true,
                theme: 'twilight',
                electricChars: true,
                mode: lang.toLowerCase(),
                onLoad: function (_cm) {
                    $scope.modeChanged = function () {
                        _cm.setOption("mode", lang.toLowerCase());
                    };
                    $scope.codemirrorLoaded = function (_editor) {
                        var _doc = _editor.getDoc();
                        _editor.clear();
                        _editor.focus();
                        _doc.markClean();
                    };

                }
            };
            $scope.cmModel = $scope.codeTextTemplate;
            mytimeout = $timeout(callAtTimeout, 1000);
            count++;
        }

    });
    function codingCompilation(count) {
        var data1 = {
            language: 17,
            editor: 1,
            content: $scope.cmModel
        };
        codeCompiler.postData(data1).then(function (response) {

            message = '';

            if (response.data.Warnings) {
                message += 'Warnings: ' + response.data.Warnings + '\n';
            }

            if (response.data.Errors) {
                message += 'Errors: ' + response.data.Errors + '\n';
            }

            if (response.data.Stats) {
                message += 'Errors: ' + response.data.Stats + '\n';
            }

            $scope.result = response.data.Result;
            $scope.info = message;
        });
    }


    function codingQuestion(questionNumber) {
        $scope.$broadcast('timer-start');
        $scope.determinateValue += 0;
        $scope.timerRunning = true;
        $scope.questionNo = questionNumber
        $scope.questionText = $scope.questions[questionNumber - 1].question;
    }

    function finishDemo() {
        $scope.titlebar = false;
        $scope.quizBegin = false;
        $scope.questioncountshow = true;
        $scope.showResults = true;
        $scope.subjectName = "  Coding quiz Demo";
        $scope.atemptedQuestions = '5';
        $scope.correctAnswers = '3';
        $scope.totalTime = '1:20';
        /*var input=$scope.questions[i].length*60;
         var jsonData= {totalTime:z(Math.floor(input/60))+':'+z(input%60),totalTimeTaken:z(minutes)+':'+z(seconds),atemptedQuestions:response.atempted,correctAnswers:response.correctanswers,totalQuestions:$localStorage.quiz.questions.length};
         console.log(jsonData);
         var correctAnswerCount=0;
         var attempted=0;
         for(var i=0;i<$scope.questions.length;i++){
         if($scope.questions[i].answeredornot=="Y"){
         console.log('1');
         attempted++;
         if($scope.questions[i].originalanswer==$scope.questions[i].candidateanswer){
         correctAnswerCount++;
         $scope.questions[i].correctanswerornot="Y"
         }
         }
         }*/
    }
    $scope.compile = function () {
        codingCompilation(count);
    };

    $scope.cancelQuiz = function () {
       /* $scope.$broadcast('timer-stopped', 0);
        $scope.counter = 5;
        $timeout.cancel(mytimeout);
        $scope.countDown = false;*/
        $state.go('website-student.coding');

    };
    $scope.nextQuestion = function () {
        $scope.resultStatus = false;
        $scope.$broadcast('timer-stopped', 0);

    };
    $scope.finishQuestion = function () {
        $state.go('website-student.coding');

    };

}])
    .controller('introCodingController', function($scope, $q, nzTour) {

        var tour = window.tour = {
            config: {
                //dark: true,
            },
            steps: [{
                target: '#codingintro',
                content: "Here we display what type of Quiz you selected"
            }, {
                target: '#subjectname',
                content: "here we display what the subject you selected"
            }, {
                target: '#progress',
                content: "progress bar indicates how many qustions you completed, which moves according to your question number"
            }, {
                target: '#timercontrol',
                content: "Here is timer, which indicates the time remains for your Question"
            }, {
                target: '#codingbody',
                content: "here you can write the code for your Question"
            }, {
                target: '#runitintro',
                content: "Every time you can check your code by clicking on RUNIT button"
            }, {
                target: '#resultintro',
                content: "Here we display the results of your code when you click on RUNIT button",
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
