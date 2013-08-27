module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: {
      production: ['../production/']
    },

    lint: {
      production: [
      'grunt.js', 
      '../app/application/*-bootstrap.js',
      '../app/*/*-constant.js', 
      '../app/*/*-controller.js', 
      '../app/*/*-directive.js', 
      '../app/*/*-service.js']
    },

    min: {
      production: {
      src: [
      '../app/application/*-bootstrap.js', 
      '../app/*/*-constant.js', 
      '../app/*/*-controller.js', 
      '../app/*/*-directive.js', 
      '../app/*/*-service.js'],

      dest: '../production/application.js'
      }
    },

    uglify: {
      mangle: {toplevel: true},
      squeeze: {dead_code: false},
      codegen: {quote_keys: true}
    },

    mincss: {
      production: {
      files: {
        "../production/application.css": [
          '../app/**/*-stylesheet.css']
      }
      }
    },

    copy: {
      production: {
        files: {
          '../production/': [
            '../app/**/*.html', 
            '../app/*.ico']
        }
      }
    },

    useminPrepare: {
      html: ['../production/index.html'],
      css: ['../production/index.html']
    },

    usemin: {
      html: ['../production/index.html'],
      css: ['../production/index.html']
    },

    jshint: {
      options: {
      browser: true
      }
    }
    });

    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');

    // Default task.
    grunt.registerTask('default', 'lint');
    grunt.registerTask('production', 'copy useminPrepare mincss min usemin');

};