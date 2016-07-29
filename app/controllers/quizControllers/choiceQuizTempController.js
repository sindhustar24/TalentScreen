/**
 * Created by sande on 4/19/2016.
 */

talentScreen.controller("choiceQuizController", ['$scope', '$cookieStore', '$localStorage', 'tsQuizTemplate', '$timeout', 'quizResults', '$state', function ($scope, $cookieStore, $localStorage, tsQuizTemplate, $timeout, quizResults, $state) {
    $scope.counter = 5;
    var value=0;
    $scope.count15 = true;
    $scope.totalTimeTaken = 0;
    $scope.sidemenu = true;
    $scope.titlebar = false;
    $scope.questioncountshow = true;
    $scope.choiceHeader = true;
    $scope.determinateValue = 0;
    $scope.toggle = true;
    $scope.toggleopen = true;
    $scope.toggleclose = false;
    $scope.quizBegin = false;
    $scope.morediv = false;
    $scope.searchSubjectDropdown = undefined;
    var count = 1;
    var sessiondata = $localStorage.candidateSessionData;
    $scope.subjectName = "";
    $scope.quizSubject = true;
    var jsonData = {type: "subject", token: sessiondata.token, testtype: 1};
    tsQuizTemplate.query(jsonData).$promise.then(function (data) {
        if (data[0].status == 400 || data[0].status == 403 || data[0].status == 404 || data[0].status == 500) {
            alert(data[0].message);
        }
        else {
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
        $scope.selectSubject = value.id;
        var subjects = $localStorage.subject;
        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].id == $scope.selectSubject) {
                $scope.subjectName = subjects[i].name;
                $scope.iconurl = subjects[i].icon_class;
                $scope.heading = "Subject";
            }

        }
        var jsonData = {type: "level", token: sessiondata.token, subjectid: $scope.selectSubject, testtype: 1};
        tsQuizTemplate.query(jsonData).$promise.then(function (data) {
            if (data[0].status == 400 || data[0].status == 403 || data[0].status == 404 || data[0].status == 500) {
                alert(data[0].message);
            } else {
                $localStorage.level = data;
                $scope.levels = data;
                $scope.quizLevels = true;
            }
        });

    };
    $scope.selectLevelChanged = function (value) {
        var level = $localStorage.level;
        $scope.selectedLevel = value.id;
        for (var i = 0; i < level.length; i++) {
            if (level[i].id == $scope.selectedLevel) {
                levelCount = level[i].count;
            }
        }
        $scope.quizLevels = false;
        $scope.quizStartAccepted = true;

    };
    $scope.startQuiz = function () {
        $scope.quizStartAccepted = false;
        $scope.countDown = true;
        $localStorage.quiz = "";
        var jsonData = {
            type: "questions",
            token: sessiondata.token,
            candidateid: sessiondata.data._id,
            testtype: 1,
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
            $scope.normalTimer = false;
            $scope.timerBlink = true;
            $scope.sidemenu = false;
            $scope.morediv = true;
        }
        else if ($scope.counter < 12) {
            $scope.normalTimer = true;
            $scope.timerBlink = false;
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
        } else {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
        }


    };

    $scope.$on('timer-stopped', function (event, remaining) {
        $timeout.cancel(mytimeout);
        $scope.questioncountshow = false;
        $scope.choiceHeader = false;
        $scope.questionCount = $localStorage.quiz.questions.length;
        $scope.sidemenu = false;
        $scope.titlebar = true;
        if (count === 1) {
            $scope.questions = $localStorage.quiz.questions;
        }
        if (remaining === 0) {
            $scope.normalTimer = false;
            $scope.timerBlink = true;
            if ($localStorage.quiz.questions) {
                $scope.countDown = false;
                if (count != 1) {
                    $scope.totalTimeTaken = $scope.totalTimeTaken + (60 - $scope.counter);
                    $localStorage.quiz.questions[count - 2].timetaken=60 - $scope.counter;
                    choiceStudentAnswer(count - 1);
                }
                if (count > $scope.questions.length) {
                    choiceQuizValidation();
                }
                else {
                    $scope.counter = 59;
                    choiceQuestion(count);
                    if (count == $scope.questions.length) {
                        $scope.determinateValue = 100;
                        $scope.count14 = true;
                        $scope.count15 = false;
                    }
                    mytimeout = $timeout($scope.onTimeout, 1000);
                    $scope.quizBegin = true;
                    count++;
                }
            }
        }

    });
    function choiceQuizValidation() {
        $scope.titlebar = false;
        $scope.quizBegin = false;
        $scope.questioncountshow = true;
        var correctAnswerCount = 0;
        var attempted = 0;
        for (var i = 0; i < $localStorage.quiz.questions.length; i++) {
            if ($localStorage.quiz.questions[i].answeredornot == "Y") {
                attempted++;
                if ($localStorage.quiz.questions[i].originalanswer == $localStorage.quiz.questions[i].candidateanswer) {
                    correctAnswerCount++;
                    $localStorage.quiz.questions[i].correctanswerornot = "Y"
                }
            }
        }
        $localStorage.quiz.correctanswers = correctAnswerCount;
        $localStorage.quiz.atempted = attempted;
        function z(n) {
            return (n < 10 ? '0' : '') + n;
        }

        var seconds = $scope.totalTimeTaken % 60;
        var minutes = Math.floor($scope.totalTimeTaken / 60);
        $localStorage.quiz.timetaken = $scope.totalTimeTaken;
        var jsonData = {data: $localStorage.quiz, token: sessiondata.token};
        quizResults.postData(jsonData).then(function (response) {
            $scope.showResults = true;
            $scope.atemptedQuestions = response.atempted;
            $scope.correctAnswers = response.correctanswers;
            $scope.totalTime = z(minutes) + ':' + z(seconds);
            var input = $localStorage.quiz.questions.length * 60;
            var jsonData = {
                totalTime: z(Math.floor(input / 60)) + ':' + z(input % 60),
                totalTimeTaken: z(minutes) + ':' + z(seconds),
                atemptedQuestions: response.atempted,
                correctAnswers: response.correctanswers,
                totalQuestions: $localStorage.quiz.questions.length
            };
            console.log(jsonData);
        });
    }

    function choiceQuestion(questionNumber) {
        $scope.$broadcast('timer-start');
        $scope.determinateValue += 6.66667;
        $scope.timerRunning = true;
        $scope.questionNo = questionNumber
        $scope.questionText = $scope.questions[questionNumber - 1].question;
        $scope.answer1Text = $scope.questions[questionNumber - 1].answer1;
        $scope.answer2Text = $scope.questions[questionNumber - 1].answer2;
        $scope.answer3Text = $scope.questions[questionNumber - 1].answer3;
        $scope.answer4Text = $scope.questions[questionNumber - 1].answer4;
        $scope.answer1 = "";
        $scope.answer2 = "";
        $scope.answer3 = "";
        $scope.answer4 = "";
    }

    function choiceStudentAnswer(count) {
        if ($scope.answer1) {
            $localStorage.quiz.questions[count - 1].candidateanswer = MD5("a");
            $localStorage.quiz.questions[count - 1].answeredornot = "Y";
        }
        else if ($scope.answer2) {
            $localStorage.quiz.questions[count - 1].candidateanswer = MD5("b");
            $localStorage.quiz.questions[count - 1].answeredornot = "Y";
        }
        else if ($scope.answer3) {
            $localStorage.quiz.questions[count - 1].candidateanswer = MD5("c");
            $localStorage.quiz.questions[count - 1].answeredornot = "Y";
        }
        else if ($scope.answer4) {
            $localStorage.quiz.questions[count - 1].candidateanswer = MD5("d");
            $localStorage.quiz.questions[count - 1].answeredornot = "Y";
        }
    }

    $scope.cancelQuiz = function () {
        $scope.$broadcast('timer-stopped', 0);
        $scope.counter = 5;
        $timeout.cancel(mytimeout);
        $scope.countDown = false;
        $state.go('website-student.take-challange-quiz');

    };

    $scope.nextQuestion = function () {
        $scope.resultStatus = false;
        $scope.$broadcast('timer-stopped', 0);

    };
    $scope.finishQuestion = function () {
        $scope.resultStatus = false;
        $scope.$broadcast('timer-stopped', 0);

    };
    $scope.myVar = true;
    $scope.toggle = function () {
        $scope.myVar = !$scope.myVar;
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




}]).controller("demoquizController", ['$scope', '$timeout', '$state', function ($scope, $timeout, $state) {
    $scope.counter = 5;
    $scope.countDown = true;
    $scope.count15 = true;
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
            choiceQuestion(count);
            mytimeout = $timeout(callAtTimeout, 1000);
            count++;
        }

    });


    choiceQuestion(count);
    function choiceQuestion(questionNumber) {
        $scope.$broadcast('timer-start');
        $scope.determinateValue += 0;
        $scope.timerRunning = true;
        $scope.questionNo = questionNumber
        $scope.questionText = $scope.questions[questionNumber - 1].question;
        $scope.answer1Text = $scope.questions[questionNumber - 1].answer1;
        $scope.answer2Text = $scope.questions[questionNumber - 1].answer2;
        $scope.answer3Text = $scope.questions[questionNumber - 1].answer3;
        $scope.answer4Text = $scope.questions[questionNumber - 1].answer4;
        $scope.answer1 = "";
        $scope.answer2 = "";
        $scope.answer3 = "";
        $scope.answer4 = "";
    }

    function finishDemo() {
        console.log('Hi h');
        $scope.titlebar = false;
        $scope.quizBegin = false;
        $scope.questioncountshow = true;
        $scope.showResults = true;

        $scope.subjectName = "  Choice quiz Demo";
        $scope.atemptedQuestions = '5';
        $scope.correctAnswers = '3';
        $scope.totalTime = '1:20';


    }

    $scope.nextQuestion = function () {
        $scope.resultStatus = false;
        $scope.$broadcast('timer-stopped', 0);

    };
    $scope.cancelQuiz = function () {
        $scope.$broadcast('timer-stopped', 0);
        $scope.counter = 5;
        $timeout.cancel(mytimeout);
        $scope.countDown = false;
        $state.go('website-student.take-challange-quiz');

    };
    $scope.finishQuestion = function () {
        $state.go('website-student.choice');
    };

}]).controller('introController', function($scope, $q, nzTour) {

        var tour = window.tour = {
            config: {
                //dark: true,
            },
            steps: [{
                target: '#choicequizintro',
                content: "Here we display what type of Quiz you selected"
            }, {
                target: '#progressbarintro',
                content: "progress bar indicates how many qustions you completed, which moves according to your question number "
            }, {
                target: '#subjectname',
                content: "here we display what the subject you selected "
            }, {
                target: '#answer1',
                content: "here these are the options you can select only one option out of four options"
            }, {
                target: '#timercontrol',
                content: "Here is timer, which indicates the time remains for your Question "
            }, {
                target: '#nextQuestion',
                content: "If you click on Next Question you will go to next question "
            }, {
                target: '#questionno',
                content: "here we will show the Question number",
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

    })
    .controller('TimerCtrl', function($scope,$timeout) {
        var vm = this,
            timeout;
        vm.value = 0;
        vm.max = 5;
        vm.animation = "linearEase";
        vm.iterations = 20; // Accelerate animation to fit the 1 second timeout function
        vm.label = "";
        vm.start = function() {
            vm.label = $scope.counter + "s";
            timeout = $timeout(function() {
                vm.value++;
                if(vm.value > vm.max) {
                    vm.value = 0;
                }
                vm.start();
            }, 1000);

        };

        vm.start();

    });



