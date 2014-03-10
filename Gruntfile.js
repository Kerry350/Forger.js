module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    browserify: {
      main: {
        src: ['src/main.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/license.js',
              'lib/**/*.js',
              'dist/<%= pkg.name %>.js'
             ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        preserveComments: 'some',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          document: true
        }
      }
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        tasks: ['build'],
        options: {
          livereload: true
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('build', ['browserify', 'concat', 'uglify']);

};