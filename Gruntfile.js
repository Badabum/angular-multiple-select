module.exports = function(grunt){
    grunt.initConfig({
        jshint:{
            files:['Gruntfile.js']
        },
        ngAnnotate:{
            options:{
                separator:";",
                singleQuotes:true
            },
            directive:{
                files:{
                    'src/dist/bz-select-multiple.min.js':['src/js/bz-select-multiple.js']
                }
            }
        },
        ngtemplates:{
            'bz.select-multiple':{
                cwd:"src/tmpl/",
                src:"*.html",
                dest:"src/dist/bz-select-multiple.min.js",
                options:{
                    prefix:"/templates/",
                    append:true,
                    htmlmin:{
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('jshint',['jshint']);
    grunt.registerTask('default',['ngAnnotate', 'ngtemplates']);
    grunt.registerTask('annotate',['ngAnnotate']);
}
