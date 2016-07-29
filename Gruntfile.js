/**
 * Created by Innovapath on 6/26/2016.
 */
module.exports = function (grunt) {
    var srcfiles = "";
    for (i = 48; i < 65; i++) {
        srcfiles += "<%= dom_munger.data.myJsRefs[" + i + "] %>,";
    }
    var appFiles = new Array();
    appFiles = srcfiles.split(",");
    appFiles.pop();
    console.log(appFiles);
    grunt.initConfig({
        watch: {
            options: {
                dateFormat: function (time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            dev: {
                files: ['app/**/*.js'],
                tasks: 'jshint:dev'
            },
            prod: {
                files: ['app.js'],
                tasks: 'jshint:prod'
            }
        },
        dom_munger: {
            your_target: {
                options: {
                    read: {selector: 'script', attribute: 'src', writeto: 'myJsRefs', isPath: true}
                },
                src: 'index.html'
            }
        },
        uglify: {
            dist: {
                src: appFiles,
                dest: 'minified/app/app.min.js'
            }
        },
        jshint: {
            dev: {
                src: ['app/**/*.js', 'Gruntfile.js']
            },
            prod: {
                src: ['app/**/*.js']
            }
        },
        nightwatch: {
            options: {
                standalone: true,
                src_folders: ['tests/tests'],
                output_folder: 'report'
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-nightwatch');
    grunt.registerTask('dev', ['watch:dev', 'jshint:dev']);
    grunt.registerTask('prod', ['watch:prod', 'jshint:prod']);
    grunt.registerTask('default', ['dom_munger', 'uglify']);
};