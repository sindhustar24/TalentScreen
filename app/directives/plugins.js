/**
 * Created by svelupula on 2/17/2016.
 */

(function () {
    "use strict";

    talentScreen.directive('carousel', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkCarousel();
            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.toggle == 'check-all') {
                    el.tkCheckAll();
                }

            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggle == 'collapse') {
                    el.tkCollapse();
                }
            }
        };
    }]);


    talentScreen.directive('cover', ['$timeout', function ($timeout) {
        return {
            restrict: 'C',
            link: function (scope, el) {
                $timeout(function () {
                    el.tkCover();
                }, 200);
            }
        };
    }]);


    talentScreen.directive('datepicker', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkDatePicker();
            }
        };
    }]);

    talentScreen.directive('daterangepickerReport', [function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkDaterangepickerReport();
                }
            };
        }])
        .directive('daterangepickerReservation', [function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkDaterangepickerReservation();
                }
            };
        }]);


    talentScreen.directive('expandable', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkExpandable();
            }
        };
    }]);

    talentScreen.directive('minicolors', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkMiniColors();
            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.toggle == 'modal') {
                    el.tkModal();
                }
                if (attrs.toggle == 'tk-modal-demo') {
                    el.tkModalDemo();
                }

            }
        };
    }]);

    talentScreen.directive('nestable', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkNestable();
            }
        };
    }]);


    var randomId = function () {
        /** @return String */
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    talentScreen.directive('toggle', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            priority: 100,
            compile: function (el, attrs) {

                if (attrs.toggle !== 'panel-collapse') return;

                var body = angular.element('.panel-body', el),
                    id = body.attr('id') || randomId(),
                    collapse = angular.element('<div/>');

                collapse
                    .attr('id', id)
                    .addClass('collapse' + (el.data('open') ? ' in' : ''))
                    .append(body.clone());

                body.remove();

                el.append(collapse);

                $('.panel-collapse-trigger', el)
                    .attr('data-toggle', 'collapse')
                    .attr('data-target', '#' + id)
                    .collapse({trigger: false})
                    .removeAttr('style');

                return function (scope, el, attrs) {
                };

            }
        };
    }]);


    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggle == 'select2' || attrs.toggle == 'select2-tags') {
                    el.tkSelect2();
                }
            }
        };
    }]);

    talentScreen.directive('selectpicker', ['$timeout', function($timeout) {
        return {
            restrict: 'C',
            link: function (scope, el) {
                $timeout(function() {
                    el.tkSelectPicker({showSubtext: true});
                });
            }
        };
    }]);

    talentScreen.directive('slider', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.slider == 'default') {
                    el.tkSlider();
                }

                if (attrs.slider == 'formatter') {
                    el.tkSliderFormatter();
                }

            }
        };
    }]);

    talentScreen.directive('onSlide', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                el.tkSliderUpdate();

            }
        };
    }]);

    talentScreen.directive('summernote', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkSummernote();
            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.toggle == 'data-table') {
                    el.tkDataTable();
                }

            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.toggle == 'tab') {
                    el.click(function (e) {
                        e.preventDefault();
                    });
                }

            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.toggle == 'touch-spin') {
                    el.tkTouchSpin();
                }

            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.toggle == 'tree') {
                    el.tkFancyTree();
                }

            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggle == 'wizard') {
                    el.tkWizard();
                }
            }
        };
    }]);


    talentScreen.directive('toggle', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggle == 'gridalicious') {
                    $timeout(function () {
                        el.tkGridalicious();
                    }, 100);
                }
            }
        };
    }]);

    talentScreen.directive('toggle', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggle == 'isotope') {
                    $timeout(function () {
                        el.tkIsotope();
                    }, 100);
                }
            }
        };
    }]);

    talentScreen.directive('parallax', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkParallax();
            }
        };
    }]);

    talentScreen.directive('scrollable', [function () {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    el.tkScrollable();
                }
            };
        }])
        .directive('scrollableH', [function () {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    el.tkScrollable({horizontal: true});
                }
            };
        }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggle == 'sidebar-size-pc-demo') {
                    el.tkSidebarSizePcDemo();
                }
            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (attrs.toggle !== 'google-maps') return;

                el.tkGoogleMap();
            }
        };
    }]);

    talentScreen.directive('formControlMaterial', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.find('.form-control').tkFormControlMaterial();
            }
        };
    }]);

    var ripple = function (e) {

        var el, ink, d, x, y;

        el = angular.element(this);

        el.addClass('ripple');

        if (el.parents('.sidebar-skin-white').length) {
            el.addClass('ripple-dark-fade');
        }

        if (el.parents('.sidebar-skin-dark').length) {
            el.addClass('ripple-light-fade');
        }

        if (el.is('.btn-white')) {
            el.addClass('ripple-dark-fade');
        }

        if (el.attr('href') && !el.data('toggle')) {

            e.preventDefault();
            e.stopPropagation();

            setTimeout(function () {
                document.location = el.attr('href');
            }, 400);
        }

        // create .ink element if it doesn't exist
        if (el.find(".ink").length === 0)
            el.prepend("<span class='ink'></span>");

        ink = el.find(".ink");
        // in case of quick double clicks stop the previous animation
        ink.removeClass("animate");

        // set size of .ink
        if (!ink.height() && !ink.width()) {
            // use el's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(el.outerWidth(), el.outerHeight());
            ink.css({height: d, width: d});
        }

        // get click coordinates
        // logic = click coordinates relative to page - el's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - el.offset().left - ink.width() / 2;
        y = e.pageY - el.offset().top - ink.height() / 2;

        // set the position and add class .animate
        ink.css({top: y + 'px', left: x + 'px'}).addClass("animate");

    };

    talentScreen.directive('uiSref', [function () {
            return {
                restrict: 'A',
                priority: 999,
                link: function (scope, el) {
                    if (el[0].nodeName == 'A' || el[0].nodeName == 'BUTTON') {
                        el.click(ripple);
                    }
                }
            };
        }])
        .directive('btn', [function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.click(ripple);
                }
            };
        }])
        .directive('sidebarMenu', ['$timeout', function ($timeout) {
            return {
                restrict: 'C',
                priority: 999,
                link: function (scope, el) {
                    $timeout(function () {
                        el.find('>li>a').click(ripple);
                    });
                }
            };
        }])
        .directive('navbarNav', [function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.find('>li>a').click(ripple);
                }
            };
        }])
        .directive('dropdownMenu', [function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.find('>li>a').click(ripple);
                }
            };
        }]);


    talentScreen.directive('owlBasic', ['$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function () {
                        el.tkOwlDefault();
                    }, 200);
                }
            };
        }])
        .directive('owlMixed', ['$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function () {
                        el.tkOwlMixed();
                    }, 200);
                }
            };
        }])
        .directive('owlPreview', ['$timeout', function ($timeout) {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    $timeout(function () {
                        el.tkOwlPreview();
                    }, 200);
                }
            };
        }]);

    talentScreen.directive('slickBasic', ['$timeout', function ($timeout) {
        return {
            restrict: 'C',
            link: function (scope, el) {
                $timeout(function () {
                    el.tkSlickDefault();
                }, 200);
            }
        };
    }]);

    talentScreen.directive('type', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (!el.is('.sidebar')) return;
                if (attrs.type !== 'collapse') return;

                el.tkSidebarCollapse();
            }
        };
    }]);

    talentScreen.directive('type', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (!el.is('.sidebar')) return;
                if (attrs.type !== 'dropdown') return;

                el.tkSidebarDropdown();
            }
        };
    }]);

    talentScreen.directive('toggleBar', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggleBar) {
                    el.tkSidebarToggleBar();
                }
            }
        };
    }]);

    talentScreen.directive('tkCountdown', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkCountdown();
                scope.$on("$destroy", function () {
                    el.countdown('pause');
                });
            }
        };
    }]);

    talentScreen.directive('curriculum', [function () {
        return {
            restrict: 'C',
            link: function (scope, el) {
                el.tkCurriculum();
                el.find('.list-group-item').click(function () {
                    scope.$state.go($(this).data('target'));
                });
            }
        };
    }]);

    talentScreen.directive('toggle', [function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (attrs.toggle == 'flot-chart-earnings') {
                    el.tkFlotChartEarnings();
                }
            }
        };
    }]);

    talentScreen.directive('windowNavbarTransition', ['$window', function ($window) {
            return function (scope, el) {
                angular.element($window).tkScrollNavbarTransition();
            };
        }])
        .directive('stContentInner', [function () {
            return {
                restrict: 'C',
                link: function (scope, el) {
                    el.tkScrollNavbarTransition();
                }
            };
        }]);


})();

