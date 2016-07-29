/**
 * Created by Sandeep on 16-Feb-16.
 */

talentScreen.config(
    ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', '$resourceProvider','$locationProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $authProvider, $resourceProvider,$locationProvider) {


            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $resourceProvider.defaults.stripTrailingSlashes = false;
            $resourceProvider.defaults.useXDomain = true;

            var htmlClass = {
                website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
                websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
                websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
                websiteLogin: 'hide-sidebar ls-bottom-footer',
                websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
                appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
                appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
            };

           /* $locationProvider.html5Mode(true);*/
            $urlRouterProvider
                .otherwise('/website-pages/home');
            $authProvider.github({
                clientId:'fea08060250c3b058ce4'
            });
            $authProvider.facebook({
                clientId: '764691206966361'
            });
            $authProvider.twitter({
                url: 'http://104.197.157.127/api/v1/talentscreen/social/twitter'
            });
            $authProvider.linkedin({
                clientId: '75v6qsgxg7lksb'
            });
            $authProvider.google({
                clientId: '67963478686-jqfdc7oohr1ah13ec6pia1r6pr671lt1.apps.googleusercontent.com'
            });

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'website/login.html',
                    controller: ['$scope', function($scope,$rootScope){
                        $scope.app.settings.htmlClass = htmlClass.websiteLogin;
                        $scope.app.settings.bodyClass = 'sueLogin';
                       /* $rootScope.title = 'Snoopex Computer Repairs and Upgrades Campbelltown and Wollongong';
                        $rootScope.metaDescription = 'Professional computer repairs, upgrades and custom built PCs. Providing';*/
                    }]
                })

                ///////// TEMP Sue's new login /////////////////////////////////
                .state('sueLogin', {
                    url: '/sueLogin',
                    templateUrl: 'website/loginSue.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.websiteLogin;
                        $scope.app.settings.bodyClass = 'sueLogin';
                    }]
                })
                /////////////////////////////////////////////////////////////////////////

                //  TEMP - SUE /////////
                .state('sueSignUp', {
                    url: '/sueSignUp',
                    templateUrl: 'website/sign-upSue.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.websiteLogin;
                        $scope.app.settings.bodyClass = 'sueSignUp';
                    }]
                })
                //////////////// End of Sue's Sign up ///////////this is your changes



                .state('emailActive', {
                    url: '/emailActive',
                    templateUrl: 'website/emailactivation.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.websiteLogin;
                        $scope.app.settings.bodyClass = 'login';
                    }]
                })
                .state('forgot', {
                    url: '/forgot',
                    templateUrl: 'website/forgotpassword.html',
                    controller: ['$scope', function ($scope) {
                        $scope.app.settings.htmlClass = htmlClass.websiteLogin;
                        $scope.app.settings.bodyClass = 'login';
                    }]
                })



                .state('sign-up', {
                    url: '/sign-up',
                    templateUrl: 'website/sign-up.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.websiteLogin;
                        $scope.app.settings.bodyClass = 'sueSignUp';
                    }]
                });


            $stateProvider
                .state('website-pages', {
                    abstract: true,
                    url: '/website-pages',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('website-pages.tutors', {
                    url: '/tutors',
                    templateUrl: 'website/tutors.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-pages.home', {
                    url: '/home',
                    templateUrl: 'website/home.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-pages.pricing', {
                    url: '/pricing',
                    templateUrl: 'website/pricing.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.websitePricing;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-pages.survey', {
                    url: '/survey',
                    templateUrl: 'website/survey.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.websiteSurvey;
                        $scope.app.settings.bodyClass = 'survey';
                    }]
                })
                .state('website-pages.contact', {
                    url: '/contact',
                    templateUrl: 'website/contact.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('website-forum', {
                    abstract: true,
                    url: '/website-forum',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('website-forum.home', {
                    url: '/home',
                    templateUrl: 'website/forum-home.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-forum.category', {
                    url: '/category',
                    templateUrl: 'website/forum-category.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-forum.thread', {
                    url: '/thread',
                    templateUrl: 'website/forum-thread.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('website-blog', {
                    abstract: true,
                    url: '/website-blog',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('website-blog.listing', {
                    url: '/listing',
                    templateUrl: 'website/blog-listing.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-blog.post', {
                    url: '/post',
                    templateUrl: 'website/blog-post.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('website-courses', {
                    abstract: true,
                    url: '/website-courses',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('website-courses.grid', {
                    url: '/grid',
                    templateUrl: 'website/courses-grid.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-courses.list', {
                    url: '/list',
                    templateUrl: 'website/courses-list.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('website-courses.single', {
                    url: '/single',
                    templateUrl: 'website/course.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('website-student', {
                    abstract: true,
                    url: '/website-student',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('website-student.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/views/studentViews/student-dashboard.html',
                    controller: 'sessionController'
                })
                .state('website-student.demoChoiceQuiz', {
                    url: '/demoChoiceQuiz',
                    templateUrl: 'app/views/studentViews/demoChoiceQuiz.html',
                    controller: 'sessionController'
                })
                .state('website-student.demoCodingQuiz', {
                    url: '/demoCodingQuiz',
                    templateUrl: 'app/views/studentViews/demoCodingQuiz.html',
                    controller: 'sessionController'
                })
                .state('website-student.take-challange-quiz', {
                    url: '/take-challange-quiz',
                    templateUrl: 'app/views/studentViews/student-take-challange-quiz.html',
                    controller: 'sessionController'
                })
                .state('website-student.tour4Choice', {
                    url: '/introChoice',
                    templateUrl: 'app/views/studentViews/introChoice.html',
                    controller: 'sessionController'
                })
                .state('website-student.tour4Coding', {
                    url: '/introCoding',
                    templateUrl: 'app/views/studentViews/introCoding.html',
                    controller: 'sessionController'
                })
                .state('website-student.tour4Video', {
                    url: '/introvideo',
                    templateUrl: 'app/views/studentViews/introVideo.html',
                    controller: 'sessionController'
                })
                .state('website-student.coding', {
                    url: '/coding',
                    templateUrl: 'app/views/studentViews/codingQuiz.html',
                    controller: 'sessionController'
                })
                .state('website-student.choice', {
                    url: '/choice',
                    templateUrl: 'app/views/studentViews/choiceQuiz.html',
                    controller: 'sessionController'
                })
                .state('website-student.video', {
                    url: '/video',
                    templateUrl: 'app/views/studentViews/videoQuiz.html',
                    controller: 'sessionController'
                })
                .state('website-student.showvideo', {
                    url: '/showvideo',
                    templateUrl: 'app/views/studentViews/showVideo.html',
                    controller: 'sessionController'
                })
                .state('website-student.courses', {
                    url: '/courses',
                    templateUrl: 'app/views/studentViews/student-courses.html',
                    controller:'sessionController'
                })
                .state('website-student.take-course', {
                    url: '/take-course',
                    templateUrl: 'app/views/studentViews/student-take-course.html',
                    controller: 'sessionController'
                })

                .state('website-student.profile', {
                    url: '/studentprofile',
                    templateUrl: 'app/views/studentViews/studentProfile.html',
                    controller: 'sessionController'
                })
                .state('website-student.course-forums', {
                    url: '/course-forums',
                    templateUrl: 'app/views/studentViews/student-course-forums.html',
                    controller:'sessionController'
                })
                .state('website-student.course-forum-thread', {
                    url: '/course-forum-thread',
                    templateUrl: 'app/views/studentViews/student-course-forum-thread.html',
                    controller: 'sessionController'
                })
                .state('website-student.myChallenge', {
                    url: '/Challenge',
                    templateUrl: 'app/views/studentViews/mychallenge.html',
                    controller: 'sessionController'
                })
                .state('website-student.private-profile', {
                    url: '/private-profile',
                    templateUrl: 'app/views/studentViews/student-private-profile.html',
                    controller:'sessionController'
                })
                .state('website-student.mySubject', {
                    url: '/mySubject',
                    templateUrl: 'app/views/studentViews/mysubject.html',
                    controller: 'sessionController'
                });
            $stateProvider
                .state('website-instructor', {
                    abstract: true,
                    url: '/website-instructor',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('website-instructor.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'website/instructor-dashboard.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.profile', {
                    url: '/profile',
                    templateUrl: 'website/profile.html',
                    controller: 'empSessionController'
                })
                .state('website-instructor.courses', {
                    url: '/courses',
                    templateUrl: 'website/instructor-courses.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.edit-course', {
                    url: '/edit-course',
                    templateUrl: 'website/instructor-edit-course.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.edit-course-meta', {
                    url: '/edit-course-meta',
                    templateUrl: 'website/instructor-edit-course-meta.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.edit-course-lessons', {
                    url: '/edit-course-lessons',
                    templateUrl: 'website/instructor-edit-course-lessons.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.earnings', {
                    url: '/earnings',
                    templateUrl: 'website/instructor-earnings.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.statement', {
                    url: '/instructor',
                    templateUrl: 'website/instructor-statement.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.messages', {
                    url: '/messages',
                    templateUrl: 'website/instructor-messages.html',
                    controller: "empSessionController"
                })


                .state('website-instructor.private-profile', {
                    url: '/private-profile',
                    templateUrl: 'website/instructor-private-profile.html',
                    controller: "empSessionController"
                })
                .state('website-instructor.billing', {
                    url: '/billing',
                    templateUrl: 'website/instructor-billing.html',
                    controller: "empSessionController"
                });

            $stateProvider
                .state('essential', {
                    abstract: true,
                    url: '/essential',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('essential.buttons', {
                    url: '/buttons',
                    templateUrl: 'essential/buttons.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('essential.icons', {
                    url: '/icons',
                    templateUrl: 'essential/icons.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('essential.progress', {
                    url: '/progress',
                    templateUrl: 'essential/progress.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('essential.grid', {
                    url: '/grid',
                    templateUrl: 'essential/grid.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('essential.forms', {
                    url: '/forms',
                    templateUrl: 'essential/forms.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('essential.tables', {
                    url: '/tables',
                    templateUrl: 'essential/tables.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('essential.tabs', {
                    url: '/tabs',
                    templateUrl: 'essential/tabs.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.website;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('app-student', {
                    abstract: true,
                    url: '/app-student',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('app-student.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/student-dashboard.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.messages', {
                    url: '/messages',
                    templateUrl: 'app/student-messages.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.private-profile', {
                    url: '/profile',
                    templateUrl: 'app/student-profile.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.billing', {
                    url: '/billing',
                    templateUrl: 'app/student-billing.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.courses', {
                    url: '/courses',
                    templateUrl: 'app/student-courses.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl1r3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.course-forums', {
                    url: '/course-forums',
                    templateUrl: 'app/student-course-forums.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl1r3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.course-forum-thread', {
                    url: '/course-forum-thread',
                    templateUrl: 'app/student-course-forum-thread.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl1r3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.take-course', {
                    url: '/take-course',
                    templateUrl: 'app/student-take-course.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl1r3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-student.take-quiz', {
                    url: '/take-quiz',
                    templateUrl: 'app/student-take-quiz.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl1r3;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('app-forum', {
                    abstract: true,
                    url: '/app-forum',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('app-forum.home', {
                    url: '/home',
                    templateUrl: 'app/forum-home.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-forum.category', {
                    url: '/category',
                    templateUrl: 'app/forum-category.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-forum.thread', {
                    url: '/thread',
                    templateUrl: 'app/forum-thread.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('app-courses', {
                    abstract: true,
                    url: '/app-courses',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('app-courses.grid', {
                    url: '/grid',
                    templateUrl: 'app/directory-grid.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl1r3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-courses.list', {
                    url: '/list',
                    templateUrl: 'app/directory-list.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl1r3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-courses.course', {
                    url: '/course',
                    templateUrl: 'app/course.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                });

            $stateProvider
                .state('app-instructor', {
                    abstract: true,
                    url: '/app-instructor',
                    template: '<div ui-view class="ui-view-main" />'
                })
                .state('app-instructor.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/instructor-dashboard.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.courses', {
                    url: '/courses',
                    templateUrl: 'app/instructor-courses.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.edit-course', {
                    url: '/edit-course',
                    templateUrl: 'app/instructor-edit-course.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.edit-course-meta', {
                    url: '/edit-course-meta',
                    templateUrl: 'app/instructor-edit-course-meta.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.edit-course-lessons', {
                    url: '/edit-course-lessons',
                    templateUrl: 'app/instructor-edit-course-lessons.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.earnings', {
                    url: '/earnings',
                    templateUrl: 'app/instructor-earnings.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.statement', {
                    url: '/instructor',
                    templateUrl: 'app/instructor-statement.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.messages', {
                    url: '/messages',
                    templateUrl: 'app/instructor-messages.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.private-profile', {
                    url: '/private-profile',
                    templateUrl: 'app/instructor-private-profile.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                })
                .state('app-instructor.billing', {
                    url: '/billing',
                    templateUrl: 'app/instructor-billing.html',
                    controller: ['$scope', function($scope){
                        $scope.app.settings.htmlClass = htmlClass.appl3;
                        $scope.app.settings.bodyClass = '';
                    }]
                });
        }
    ]);