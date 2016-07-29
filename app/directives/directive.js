/**
 * Created by Sandeep on 16-Feb-16.
 */
talentScreen.directive('testTypes',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/testTypes.html"
    }
}).directive('studentSideMenu',function(){
    return {
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/student-side-menu.html"
    }
}).directive('fiterSection',function(){
        return {
            restrict:"E",
            templateUrl:"app/directives/views/studentDirectiveViews/fitersSection.html"
        }
    }).directive('videoQuiz',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/videoQuizTemplate.html"
    }
}).directive('quizLevel',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/quizLevel.html"
    }
}).directive('quizSubject',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/quizSubject.html"
    }
}).directive('choiceQuiz',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/choiceQuizTemplate.html"
    }
}).directive('challengequiz',function(){
    return{
        restrict:"E",
        templateUrl:"app1/views/studentViews/mychallenge.html"
    }
}).directive('codingQuiz',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/codingQuizTemplate.html"
    }
}).directive('quizResults',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/quizResultsPage.html"
    }
}).directive('subjectDisplay',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/subjectGridDisplay.html"
    }
}).directive('listDisplay',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/subjectListDisplay.html"
    }
}).directive('profileData',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/profileDetails.html"
    }
}).directive('questionCount',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/questioncount.html"
    }
}).directive('demochoiceQuiz',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/demoChoiceQuizTemplate.html"
    }
}) .directive('democodingQuiz',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/demoCodingQuizTemplate.html"
    }
}).directive('footer',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/footer.html"

    }
}).directive('studentDashboard',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/studentDirectiveViews/headerStudentDashBoard.html"
    }
})
    .directive('videoCount',function(){
        return{
            restrict:"E",
            templateUrl:"app/directives/views/studentDirectiveViews/videoquizcount.html"
        }
    })
.directive('homePage',function(){
    return{
        restrict:"E",
        templateUrl:"app/directives/views/headerHomePage.html"
    }
})
.directive('topSignNav',function(){
    return {
        restrict:"E",
        templateUrl:"app/directives/views/headerSignIn.html"
    }
})
.directive('subjectLibrary',function(){
    return {
        restrict:"E",
        templateUrl:"app/directives/views/subjectLibrary.html"
    }
}).directive('topNavBar',function(){
    return {
        restrict:"E",
        templateUrl:"app/directives/views/headerSignUp.html"
    }
})
    .directive('mychallangeTable',function(){
        return {
            require:'E',
            templateUrl:'app/directives/views/studentDirectiveViews/mychallangeTable.html'
        }

    }).directive('viewMore', function ($timeout, $window) {
        return {
            restrict: 'E',
            scope: {
                customdata: '='
            },
            templateUrl: 'app/directives/views/studentDirectiveViews/collapse.html',

            link: function (scope, elm, attrs) {

                var viewMore = function () {
                    var offsetHeight = (elm[0].querySelector('#viewMoreDataDiv1')).offsetHeight; //Visible height of the viewMoreDataDiv div
                    var scrollHeight = (elm[0].querySelector('#viewMoreDataDiv1')).scrollHeight; //Scrollable height of the viewMoreDataDiv div

                    if ((offsetHeight + 2) < scrollHeight) {
                        $("#viewMoreDiv1").show();
                    } else {
                        $("#viewMoreDiv1").hide();
                    }
                };

                $timeout(function () {
                    viewMore();
                    scope.$apply();
                }, 10);

                var w = angular.element($window);

                w.bind('resize', function () {
                    updateView();
                });

                /** showMore - Called on click of 'View more' link **/
                scope.showMore = function () {
                    var el = $("#viewMoreDataDiv1"),
                        curHeight = el.height(),
                        autoHeight = el.css('height', 'auto').height(); //Temporarily change to auto and get the height.

                    el.height(curHeight).animate({ height: autoHeight }, 600, function () {
                        /*Now, change the height to auto when animation finishes.
                         Added to make the container flexible (Optional).*/
                        el.css('height', 'auto');
                    });
                    $("#viewMore1").hide();
                    $("#viewLess1").show();
                }

                /** showLess - Called on click of 'View less' link **/
                scope.showLess = function () {
                    $("#viewMoreDataDiv1").animate({ height: '50px' }, 500);
                    $("#viewMore1").show();
                    $("#viewLess1").hide();
                }

                var updateView = function () {
                    var id = scope.customdata.id;
                    var $content = $('#viewMoreDataDiv1');

                    $content.height('100px');
                    $("#viewMore1").show();
                    $("#viewLess1").hide();

                    $timeout(viewMore, 0);
                }
            }
        };
    })


    .directive('nameValidation',function(){
        return {
            require:'ngModel',
            link:function(scope,elm,attrs,ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    var isBlank = viewValue === '';
                    ctrl.$setValidity('isBlank',!isBlank);                    
                })
            }
        }
    }

).directive('referenceCodeCheck', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue)
                {
                    var isBlank = viewValue === '';
                    var invalidLen = !isBlank && (viewValue.length < 8 || viewValue.length > 8)
                    ctrl.$setValidity('isBlank', !isBlank);
                    ctrl.$setValidity('invalidLen', !invalidLen);
                    scope.codecheck=!isBlank  && !invalidLen
                })
            }
        }
    })
    .directive('emailValidation', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue)
                {
                    var reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    var isBlank = viewValue === '';
                    var invalidChars = !isBlank &&!reg.test(viewValue);
                    ctrl.$setValidity('isBlank', !isBlank);
                    ctrl.$setValidity('invalidChars', !invalidChars);
                    scope.emailIsGood=!isBlank&&!invalidChars
                })
            }
        }
    }).directive('passwordCheck', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    var isBlank = viewValue === ''
                    var invalidLen = !isBlank && (viewValue.length < 8 || viewValue.length > 20)
                    var isWeak = !isBlank && !invalidLen && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/.test(viewValue)
                    ctrl.$setValidity('isBlank', !isBlank);
                    ctrl.$setValidity('isWeak', !isWeak);
                    ctrl.$setValidity('invalidLen', !invalidLen);
                    scope.passwordGood=!isBlank && !isWeak && !invalidLen
                })
            }
        }
    }).directive('passwordMatch', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var isBlank = viewValue === ''
                    var noMatch = viewValue != scope.mySignUpForm.ePassword.$viewValue;
                    ctrl.$setValidity('isBlank', !isBlank);
                    ctrl.$setValidity('noMatch', !noMatch);
                    scope.passwordCGood=!isBlank && !noMatch
                   })
            }
        }
    }).directive('fpasswordMatch', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var isBlank = viewValue === ''
                    var noMatch = viewValue != scope.forgotpswd.ePassword.$viewValue;
                    ctrl.$setValidity('isBlank', !isBlank);
                    ctrl.$setValidity('noMatch', !noMatch);
                    scope.passwordCGood=!isBlank && !noMatch
                })
            }
        }
    });

talentScreen.directive("directiveWhenScrolled", function() {
    return function(scope, elm, attr) {
        var raw = elm[0];

        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.directiveWhenScrolled);
            }
        });
    };
}).filter('formatTimer', function() {
    return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        return (z(minutes)+':'+z(seconds));
    };
}) .directive('blink', function($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
        },
        controller: function($scope, $element,$attrs) {
            $scope.speed = $attrs.speed;
            $scope.promise;
            $scope.blinking = true;
            function showElement() {
                $element.css("visibility", "visible");
                $scope.promise = $timeout(hideElement,$scope.speed);
            }
            function hideElement() {
                $element.css("visibility", "hidden");
                $scope.promise =  $timeout(showElement,$scope.speed);

            }

            showElement();
        },
        template: '<span ng-transclude></span>',
        replace: true
    };
}).directive( "ngTextTruncate", [ "$compile", "ValidationServices", "CharBasedTruncation", "WordBasedTruncation",
    function( $compile, ValidationServices, CharBasedTruncation, WordBasedTruncation ) {
        return {
            restrict: "A",
            scope: {
                text: "=ngTextTruncate",
                charsThreshould: "@ngTtCharsThreshold",
                wordsThreshould: "@ngTtWordsThreshold",
                customMoreLabel: "@ngTtMoreLabel",
                customLessLabel: "@ngTtLessLabel"
            },
            controller: function( $scope, $element, $attrs ) {

                $scope.toggleShow = function() {
                    $scope.open = !$scope.open;
                };
                $scope.useToggling = $attrs.ngTtNoToggling === undefined;
            },
            link: function( $scope, $element, $attrs ) {
                $scope.open = false;

                ValidationServices.failIfWrongThreshouldConfig( $scope.charsThreshould, $scope.wordsThreshould );

                var CHARS_THRESHOLD = parseInt( $scope.charsThreshould );
                var WORDS_THRESHOLD = parseInt( $scope.wordsThreshould );

                $scope.$watch( "text", function() {
                    $scope.open = false;
                    $element.empty();

                    if( CHARS_THRESHOLD ) {
                        if( $scope.text && CharBasedTruncation.truncationApplies( $scope, CHARS_THRESHOLD ) ) {
                            CharBasedTruncation.applyTruncation( CHARS_THRESHOLD, $scope, $element );

                        } else {
                            $element.append( $scope.text );
                        }

                    } else {

                        if( $scope.text && WordBasedTruncation.truncationApplies( $scope, WORDS_THRESHOLD ) ) {
                            WordBasedTruncation.applyTruncation( WORDS_THRESHOLD, $scope, $element );

                        } else {
                            $element.append( $scope.text );
                        }

                    }
                } );
            }
        };
    }] )
    .factory( "ValidationServices", function() {
        return {
            failIfWrongThreshouldConfig: function( firstThreshould, secondThreshould ) {
                if( (! firstThreshould && ! secondThreshould) || (firstThreshould && secondThreshould) ) {
                    throw "You must specify one, and only one, type of threshould (chars or words)";
                }
            }
        };
    })



    .factory( "CharBasedTruncation", [ "$compile", function( $compile ) {
        return {
            truncationApplies: function( $scope, threshould ) {
                return $scope.text.length > threshould;
            },

            applyTruncation: function( threshould, $scope, $element ) {
                if( $scope.useToggling ) {
                    var el = angular.element(    "<span>" +
                        $scope.text.substr( 0, threshould ) +
                        "<span ng-show='!open'>...</span>" +
                        "<span class='btn-link ngTruncateToggleText' " +
                        "ng-click='toggleShow()'" +
                        "ng-show='!open'>" +
                        " " + ($scope.customMoreLabel ? $scope.customMoreLabel : "more") +
                        "</span>" +
                        "<span ng-show='open'>" +
                        $scope.text.substring( threshould ) +
                        "<span class='btn-link ngTruncateToggleText'" +
                        "ng-click='toggleShow()'>" +
                        " " + ($scope.customLessLabel ? $scope.customLessLabel : "less") +
                        "</span>" +
                        "</span>" +
                        "</span>" );
                    $compile( el )( $scope );
                    $element.append( el );

                } else {
                    $element.append( $scope.text.substr( 0, threshould ) + "..." );

                }
            }
        };
    }])



    .factory( "WordBasedTruncation", [ "$compile", function( $compile ) {
        return {
            truncationApplies: function( $scope, threshould ) {
                return $scope.text.split( " " ).length > threshould;
            },

            applyTruncation: function( threshould, $scope, $element ) {
                var splitText = $scope.text.split( " " );
                if( $scope.useToggling ) {
                    var el = angular.element(    "<span>" +
                        splitText.slice( 0, threshould ).join( " " ) + " " +
                        "<span ng-show='!open'>...</span>" +
                        "<span class='btn-link ngTruncateToggleText' " +
                        "ng-click='toggleShow()'" +
                        "ng-show='!open'>" +
                        " " + ($scope.customMoreLabel ? $scope.customMoreLabel : "more") +
                        "</span>" +
                        "<span ng-show='open'>" +
                        splitText.slice( threshould, splitText.length ).join( " " ) +
                        "<span class='btn-link ngTruncateToggleText'" +
                        "ng-click='toggleShow()'>" +
                        " " + ($scope.customLessLabel ? $scope.customLessLabel : "less") +
                        "</span>" +
                        "</span>" +
                        "</span>" );
                    $compile( el )( $scope );
                    $element.append( el );

                } else {
                    $element.append( splitText.slice( 0, threshould ).join( " " ) + "..." );
                }
            }
        };
    }])
/**
 * Tour
 * directive that allows you to control the tour
 */
    .directive('tour', function($parse, $timeout, tourConfig) {
        return {
            controller: 'TourController',
            restrict: 'EA',
            scope: true,
            link: function(scope, element, attrs, ctrl) {
                if (!angular.isDefined(attrs.step)) {
                    throw ('The <tour> directive requires a `step` attribute to bind the current step to.');
                }
                var model = $parse(attrs.step);
                var backDrop = false;

                // Watch current step view model and update locally
                scope.$watch(attrs.step, function(newVal) {
                    ctrl.currentStep = newVal;
                });

                ctrl.postTourCallback = function(completed) {
                    angular.element('.tour-backdrop').remove();
                    backDrop = false;
                    angular.element('.tour-element-active').removeClass('tour-element-active');

                    if (completed && angular.isDefined(attrs.tourComplete)) {
                        scope.$parent.$eval(attrs.tourComplete);
                    }
                    if (angular.isDefined(attrs.postTour)) {
                        scope.$parent.$eval(attrs.postTour);
                    }
                };

                ctrl.postStepCallback = function() {
                    if (angular.isDefined(attrs.postStep)) {
                        scope.$parent.$eval(attrs.postStep);
                    }
                };

                ctrl.showStepCallback = function() {
                    if (tourConfig.backDrop) {
                        angular.element(tourConfig.containerElement).append(angular.element('<div class="tour-backdrop"></div>'));

                        $timeout(function() {
                            $('.tour-backdrop').remove();
                            angular.element('<div class="tour-backdrop"></div>').insertBefore('.tour-tip');
                        }, 1000)

                        backDrop = true;
                    }
                };

                // update the current step in the view as well as in our controller
                scope.setCurrentStep = function(val) {
                    model.assign(scope.$parent, val);
                    ctrl.currentStep = val;
                };

                scope.getCurrentStep = function() {
                    return ctrl.currentStep;
                };
            }
        };
    })

/**
 * Tourtip
 * tourtip manages the state of the tour-popup directive
 */
    .directive('tourtip', function($window, $compile, $interpolate, $timeout, scrollTo, tourConfig, debounce, $q) {
        var startSym = $interpolate.startSymbol(),
            endSym = $interpolate.endSymbol();

        var template = '<div tour-popup></div>';

        return {
            require: '^tour',
            restrict: 'EA',
            scope: true,
            link: function(scope, element, attrs, tourCtrl) {
                attrs.$observe('tourtip', function(val) {
                    scope.ttContent = val;
                });

                //defaults: tourConfig.placement
                attrs.$observe('tourtipPlacement', function(val) {
                    scope.ttPlacement = (val || tourConfig.placement).toLowerCase().trim();
                    scope.centered = (scope.ttPlacement.indexOf('center') === 0);
                });

                attrs.$observe('tourtipNextLabel', function(val) {
                    scope.ttNextLabel = val || tourConfig.nextLabel;
                });

                attrs.$observe('tourtipContainerElement', function(val) {
                    scope.ttContainerElement = val || tourConfig.containerElement;
                });

                attrs.$observe('tourtipMargin', function(val) {
                    scope.ttMargin = parseInt(val, 10) || tourConfig.margin;
                });

                attrs.$observe('tourtipOffsetVertical', function(val) {
                    scope.offsetVertical = parseInt(val, 10) || 0;
                });

                attrs.$observe('tourtipOffsetHorizontal', function(val) {
                    scope.offsetHorizontal = parseInt(val, 10) || 0;
                });

                //defaults: null
                attrs.$observe('onShow', function(val) {
                    scope.onStepShow = val || null;
                });

                //defaults: null
                attrs.$observe('onProceed', function(val) {
                    scope.onStepProceed = val || null;
                });

                //defaults: null
                attrs.$observe('tourtipElement', function(val) {
                    scope.ttElement = val || null;
                });

                //defaults: null
                attrs.$observe('tourtipTitle', function (val) {
                    scope.ttTitle = val || null;
                });

                //defaults: tourConfig.useSourceScope
                attrs.$observe('useSourceScope', function(val) {
                    scope.ttSourceScope = !val ? tourConfig.useSourceScope : val === 'true';
                });

                //Init assignments (fix for Angular 1.3+)
                scope.ttNextLabel = tourConfig.nextLabel;
                scope.ttContainerElement = tourConfig.containerElement;
                scope.ttPlacement = tourConfig.placement.toLowerCase().trim();
                scope.centered = false;
                scope.ttMargin = tourConfig.margin;
                scope.offsetHorizontal = 0;
                scope.offsetVertical = 0;
                scope.ttSourceScope = tourConfig.useSourceScope;
                scope.ttOpen = false;
                scope.ttAnimation = tourConfig.animation;
                scope.index = parseInt(attrs.tourtipStep, 10);

                var tourtip = $compile(template)(scope);
                tourCtrl.addStep(scope);

                // wrap this in a time out because the tourtip won't compile right away
                $timeout(function() {
                    scope.$watch('ttOpen', function(val) {
                        if (val) {
                            show();
                        } else {
                            hide();
                        }
                    });
                }, 500);


                //determining target scope. It's used only when using virtual steps and there
                //is some action performed like on-show or on-progress. Without virtual steps
                //action would performed on element's scope and that would work just fine
                //however, when using virtual steps, whose steps can be placed in different
                //controller, so it affects scope, which will be used to run this action against.
                function getTargetScope() {
                    var targetElement = scope.ttElement ? angular.element(scope.ttElement) : element;

                    var targetScope = scope;
                    if (targetElement !== element && !scope.ttSourceScope)
                        targetScope = targetElement.scope();

                    return targetScope;
                }

                function calculatePosition(element, container) {
                    var minimumLeft = 0; // minimum left position of tour tip
                    var restrictRight;
                    var ttPosition;

                    // Get the position of the directive element
                    var position = element[0].getBoundingClientRect();

                    //make it relative against page or fixed container, not the window
                    var top = position.top + window.pageYOffset;
                    var containerLeft = 0;
                    if (container && container[0]) {
                        top = top - container[0].getBoundingClientRect().top + container[0].scrollTop;
                        // if container is fixed, position tour tip relative to fixed container
                        if (container.css('position') === 'fixed') {
                            containerLeft = container[0].getBoundingClientRect().left;
                        }
                        // restrict right position if the tourtip doesn't fit in the container
                        var containerWidth = container[0].getBoundingClientRect().width;
                        if (tourtip.width() + position.width > containerWidth) {
                            restrictRight = containerWidth - position.left + scope.ttMargin;
                        }
                    }

                    var ttWidth = tourtip.width();
                    var ttHeight = tourtip.height();

                    // Calculate the tourtip's top and left coordinates to center it
                    switch (scope.ttPlacement) {
                        case 'right':
                            var _left = position.left - containerLeft + position.width + scope.ttMargin + scope.offsetHorizontal;
                            ttPosition = {
                                top: top + scope.offsetVertical,
                                left: _left > 0 ? _left : minimumLeft
                            };
                            break;
                        case 'bottom':
                            var _left = position.left - containerLeft + scope.offsetHorizontal;
                            ttPosition = {
                                top: top + position.height + scope.ttMargin + scope.offsetVertical,
                                left: _left > 0 ? _left : minimumLeft
                            };
                            break;
                        case 'center':
                            var _left = position.left - containerLeft + 0.5 * (position.width - ttWidth) + scope.offsetHorizontal;
                            ttPosition = {
                                top: top + 0.5 * (position.height - ttHeight) + scope.ttMargin + scope.offsetVertical,
                                left: _left > 0 ? _left : minimumLeft
                            };
                            break;
                        case 'center-top':
                            var _left = position.left - containerLeft + 0.5 * (position.width - ttWidth) + scope.offsetHorizontal;
                            ttPosition = {
                                top: top + 0.1 * (position.height - ttHeight) + scope.ttMargin + scope.offsetVertical,
                                left: _left > 0 ? _left : minimumLeft
                            };
                            break;
                        case 'left':
                            var _left = position.left - containerLeft - ttWidth - scope.ttMargin + scope.offsetHorizontal;
                            ttPosition = {
                                top: top + scope.offsetVertical,
                                left: _left > 0 ? _left : minimumLeft,
                                right: restrictRight
                            };
                            break;
                        default:
                            var _left = position.left - containerLeft + scope.offsetHorizontal;
                            ttPosition = {
                                top: top - ttHeight - scope.ttMargin + scope.offsetVertical,
                                left: _left > 0 ? _left : minimumLeft
                            };
                            break;
                    }

                    ttPosition.top += 'px';
                    ttPosition.left += 'px';

                    return ttPosition;
                }

                function show() {
                    if (!scope.ttContent) {
                        return;
                    }

                    if (scope.ttAnimation)
                        tourtip.fadeIn();
                    else {
                        tourtip.css({
                            display: 'block'
                        });
                    }

                    var targetElement = scope.ttElement ? angular.element(scope.ttElement) : element;

                    if (targetElement == null || targetElement.length === 0)
                        throw 'Target element could not be found. Selector: ' + scope.ttElement;

                    angular.element(scope.ttContainerElement).append(tourtip);

                    var updatePosition = function() {

                        var offsetElement = scope.ttContainerElement === 'body' ? undefined : angular.element(scope.ttContainerElement);
                        var ttPosition = calculatePosition(targetElement, offsetElement);

                        // Now set the calculated positioning.
                        tourtip.css(ttPosition);

                        // Scroll to the tour tip
                        var ttPositionTop = parseInt(ttPosition.top),
                            ttPositionLeft = parseInt(ttPosition.left);
                        scrollTo(tourtip, scope.ttContainerElement, -150, -300, tourConfig.scrollSpeed, ttPositionTop, ttPositionLeft);
                    };

                    if (tourConfig.backDrop)
                        focusActiveElement(targetElement);

                    angular.element($window).bind('resize.' + scope.$id, debounce(updatePosition, 50));

                    updatePosition();

                    if (scope.onStepShow) {
                        var targetScope = getTargetScope();

                        //fancy! Let's make on show action not instantly, but after a small delay
                        $timeout(function() {
                            targetScope.$eval(scope.onStepShow);
                        }, 300);
                    }
                }

                function hide() {
                    tourtip.detach();
                    angular.element($window).unbind('resize.' + scope.$id);
                }

                function focusActiveElement(el) {
                    angular.element('.tour-element-active').removeClass('tour-element-active');

                    if (!scope.centered)
                        el.addClass('tour-element-active');
                }

                // Make sure tooltip is destroyed and removed.
                scope.$on('$destroy', function onDestroyTourtip() {
                    angular.element($window).unbind('resize.' + scope.$id);
                    tourtip.remove();
                    tourtip = null;
                });

                scope.proceed = function() {
                    if (scope.onStepProceed) {
                        var targetScope = getTargetScope();

                        var onProceedResult = targetScope.$eval(scope.onStepProceed);
                        $q.resolve(onProceedResult).then(function () {
                            scope.setCurrentStep(scope.getCurrentStep() + 1);
                        });
                    } else {
                        scope.setCurrentStep(scope.getCurrentStep() + 1);
                    }
                };
            }
        };
    })

/**
 * TourPopup
 * the directive that actually has the template for the tip
 */
    .directive('tourPopup', function() {
        return {
            replace: true,
            templateUrl: 'tour/tour.tpl.html',
            scope: true,
            restrict: 'EA',
            link: function(scope, element, attrs) {}
        };
    })

/**
 * OrderedList
 * Used for keeping steps in order
 */
    .factory('orderedList', function() {
        var OrderedList = function() {
            this.map = {};
            this._array = [];
        };

        OrderedList.prototype.set = function(key, value) {
            if (!angular.isNumber(key))
                return;
            if (key in this.map) {
                this.map[key] = value;
            } else {
                if (key < this._array.length) {
                    var insertIndex = key - 1 > 0 ? key - 1 : 0;
                    this._array.splice(insertIndex, 0, key);
                } else {
                    this._array.push(key);
                }
                this.map[key] = value;
                this._array.sort(function(a, b) {
                    return a - b;
                });
            }
        };
        OrderedList.prototype.indexOf = function(value) {
            for (var prop in this.map) {
                if (this.map.hasOwnProperty(prop)) {
                    if (this.map[prop] === value)
                        return Number(prop);
                }
            }
        };
        OrderedList.prototype.push = function(value) {
            var key = this._array[this._array.length - 1] + 1 || 0;
            this._array.push(key);
            this.map[key] = value;
            this._array.sort(function(a, b) {
                return a - b;
            });
        };
        OrderedList.prototype.remove = function(key) {
            var index = this._array.indexOf(key);
            if (index === -1) {
                throw new Error('key does not exist');
            }
            this._array.splice(index, 1);
            delete this.map[key];
        };
        OrderedList.prototype.get = function(key) {
            return this.map[key];
        };
        OrderedList.prototype.getCount = function() {
            return this._array.length;
        };
        OrderedList.prototype.forEach = function(f) {
            var key, value;
            for (var i = 0; i < this._array.length; i++) {
                key = this._array[i];
                value = this.map[key];
                f(value, key);
            }
        };
        OrderedList.prototype.first = function() {
            var key, value;
            key = this._array[0];
            value = this.map[key];
            return value;
        };

        var orderedListFactory = function() {
            return new OrderedList();
        };

        return orderedListFactory;
    })

/**
 * ScrollTo
 * Smoothly scroll to a dom element
 */
    .factory('scrollTo', function() {
        return function(target, containerElement, offsetY, offsetX, speed, ttPositionTop, ttPositionLeft) {
            if (target) {
                offsetY = offsetY || -100;
                offsetX = offsetX || -100;
                speed = speed || 500;
                $('html,' + containerElement).stop().animate({
                    scrollTop: ttPositionTop + offsetY,
                    scrollLeft: ttPositionLeft + offsetX
                }, speed);
            } else {
                $('html,' + containerElement).stop().animate({
                    scrollTop: 0
                }, speed);
            }
        };
    })
    .factory('debounce', function($timeout, $q) {
        return function(func, wait, immediate) {
            var timeout;
            var deferred = $q.defer();
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if(!immediate) {
                        deferred.resolve(func.apply(context, args));
                        deferred = $q.defer();
                    }
                };
                var callNow = immediate && !timeout;
                if ( timeout ) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(later, wait);
                if (callNow) {
                    deferred.resolve(func.apply(context,args));
                    deferred = $q.defer();
                }
                return deferred.promise;
            };
        };
    })
    .directive('barChart', function(){
        var chart = d3.custom.barChart();
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope:{
                height: '=height',
                data: '=data',
                hovered: '&hovered'
            },
            link: function(scope, element, attrs) {
                var chartEl = d3.select(element[0]);
                chart.on('customHover', function(d, i){
                    scope.hovered({args:d});
                });

                scope.$watch('data', function (newVal, oldVal) {
                    chartEl.datum(newVal).call(chart);
                });

                scope.$watch('height', function(d, i){
                    chartEl.call(chart.height(scope.height));
                })
            }
        }
    })
    .directive('chartForm', function(){
        return {
            restrict: 'E',
            replace: true,
            controller: function AppCtrl ($scope) {
                $scope.update = function(d, i){ $scope.data = randomData(); };
                function randomData(){
                    return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
                }
            },
            template: '<div class="form">' +
            'Height: {{options.height}}<br />' +
            '<input type="range" ng-model="options.height" min="100" max="800"/>' +
            '<br /><button ng-click="update()">Update Data</button>' +
            '<br />Hovered bar data: {{barValue}}</div>'
        }
    });


