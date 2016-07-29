(function() {
    // https://gist.github.com/paulirish/1579671
    // MIT license

    'use strict';

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            window.clearTimeout(id);
        };
}());


(function() {
    'use strict';

    talentScreen.service('circularProgressService', circularProgressService);


    function circularProgressService() {
        var service = {};

        service.updateState = function(val, total, r, ring, size) {
            if (!size) {
                return ring;
            }

            var value   = val >= total ? total : val,
                perc    = total === 0 ? 0 : (value / total) * 360,
                x       = size / 2,
                start   = polarToCartesian(x, x, r, perc),
                end     = polarToCartesian(x, x, r, 0),
                arc     = perc <= 180 ? "0" : "1",
                d       = [
                    "M", start.x, start.y,
                    "A", r, r, 0, arc, 0, end.x, end.y
                ].join(" ");

            return ring.attr("d", d);
        };

        service.animations = {
            // t: Current iteration
            // b: Start value
            // c: Change in value
            // d: Total iterations
            // jshint eqeqeq: false, -W041: true

            linearEase: function(t, b, c, d) {
                return c * t / d + b;
            },

            easeInQuad: function (t, b, c, d) {
                return c*(t/=d)*t + b;
            },

            easeOutQuad: function (t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },

            easeInOutQuad: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },

            easeInCubic: function (t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },

            easeOutCubic: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },

            easeInOutCubic: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },

            easeInQuart: function (t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },

            easeOutQuart: function (t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },

            easeInOutQuart: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },

            easeInQuint: function (t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },

            easeOutQuint: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },

            easeInOutQuint: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },

            easeInSine: function (t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },

            easeOutSine: function (t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },

            easeInOutSine: function (t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            },

            easeInExpo: function (t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },

            easeOutExpo: function (t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },

            easeInOutExpo: function (t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },

            easeInCirc: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },

            easeOutCirc: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },

            easeInOutCirc: function (t, b, c, d) {
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            },

            easeInElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
                if (a < Math.abs(c)) { a=c; s=p/4; }
                else s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },

            easeOutElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
                if (a < Math.abs(c)) { a=c; s=p/4; }
                else s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },

            easeInOutElastic: function (t, b, c, d) {
                // jshint eqeqeq: false, -W041: true
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);
                if (a < Math.abs(c)) { a=c; s=p/4; }
                else s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
            },

            easeInBack: function (t, b, c, d, s) {
                // jshint eqeqeq: false, -W041: true
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },

            easeOutBack: function (t, b, c, d, s) {
                // jshint eqeqeq: false, -W041: true
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },

            easeInOutBack: function (t, b, c, d, s) {
                // jshint eqeqeq: false, -W041: true
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },

            easeInBounce: function (t, b, c, d) {
                return c - service.animations.easeOutBounce (d-t, 0, c, d) + b;
            },

            easeOutBounce: function (t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
                }
            },

            easeInOutBounce: function (t, b, c, d) {
                if (t < d/2) return service.animations.easeInBounce (t*2, 0, c, d) * 0.5 + b;
                return service.animations.easeOutBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
            }
        };

        var polarToCartesian = function(cx, cy, r, deg) {
            var rad = (deg - 90) * Math.PI / 180.0;

            return {
                x: cx + (r * Math.cos(rad)),
                y: cy + (r * Math.sin(rad))
            };
        };

        return service;
    }
})();

(function() {
    'use strict';

    talentScreen
        .directive('circularProgress', ['$window', 'circularProgressService', circularProgress]);


    function circularProgress ($window, circularProgressService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                value:          "=",
                max:            "=",
                orientation:    "@",
                radius:         "@",
                stroke:         "@",
                baseColor:      "@",
                progressColor:  "@",
                iterations:     "@",
                animation:      "@",
                label:          "@"
            },
            link: function(scope, element) {
                var options     = {
                        value:          0,
                        max:            100,
                        orientation:    1,
                        radius:         80,
                        stroke:         20,
                        baseColor:      "#a2a2a2",
                        progressColor:  "#ca2014",
                        iterations:     100,
                        animation:      "easeInOutCubic",
                        label:          ""
                    },
                    ring        = element.find('path'),
                    background  = element.find('circle'),
                    label       = element.find('text'),
                    size,
                    resetVal;

                var renderCircle = function() {
                    var radius = parseInt(options.radius),
                        stroke = parseInt(options.stroke);

                    size = (radius * 2) + (stroke * 2);

                    element.css({
                        "width":    size + "px",
                        "height":   size + "px",
                        "overflow": "hidden"
                    });

                    ring
                        .attr({
                            "transform": !options.rotation ? "" : "scale(-1, 1) translate(" + (-size) + " 0)"
                        })
                        .css({
                            "stroke":       options.progressColor,
                            "stroke-width": options.stroke
                        });

                    background
                        .attr({
                            "cx":   radius + stroke,
                            "cy":   radius + stroke,
                            "r":    radius
                        })
                        .css({
                            "stroke":       options.baseColor,
                            "stroke-width": options.stroke
                        });

                    label
                        .attr({
                            "x":            radius + stroke,
                            "y":            radius + stroke,
                            "text-anchor":  "middle",
                            "font-size":    radius / 3,
                            "fill":         options.progressColor,
                        })
                        .text(options.label);
                };

                var renderState = function(newVal, oldVal) {
                    if (!angular.isDefined(newVal)) {
                        return false;
                    }

                    if (newVal < 0) {
                        resetVal = oldVal;
                        return scope.value = 0;
                    }

                    if (newVal > scope.max) {
                        resetVal = oldVal;
                        return scope.value = options.max;
                    }

                    var start = oldVal === newVal ? 0 : (oldVal || 0),
                        val = newVal - start,
                        iteration   = 0,
                        easingAnimation = circularProgressService.animations[options.animation];


                    if (angular.isNumber(resetVal)) {
                        start       = resetVal;
                        val         = newVal - resetVal;
                        resetVal    = null;
                    }

                    (function animate() {
                        circularProgressService.updateState(
                            easingAnimation(iteration, start, val, parseInt(options.iterations)),
                            parseInt(options.max),
                            parseInt(options.radius),
                            ring,
                            size
                        );

                        if (iteration < parseInt(options.iterations)) {
                            $window.requestAnimationFrame(animate);
                            iteration++;
                        }
                    })();

                };

                scope.$watchCollection('[value, max, orientation, radius, stroke, baseColor, progressColor, iterations]', function(newVal, oldVal, scope) {
                    angular.forEach(scope, function(val, key) {
                        if (key.indexOf('$') && scope !== val && angular.isDefined(val)) {
                            options[key] = val;
                        }
                    });

                    renderCircle();
                    renderState(newVal[0], oldVal[0]);
                });
            },
            template: [
                '<svg class="angular-circular-progress" xmlns="http://www.w3.org/2000/svg">',
                    '<circle fill="none"/>',
                    '<path fill="none"/>',
                    '<text fill="none"/>',
                '</svg>',
            ].join('\n')
        };
    }
})();
