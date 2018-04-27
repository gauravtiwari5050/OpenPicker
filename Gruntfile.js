/*jshint node: true */

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'bower_components/underscore/underscore.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/async/dist/async.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-resource/angular-resource.min.js',
          'bower_components/angular-cookies/angular-cookies.min.js',
          'bower_components/angular-mocks/angular-mocks.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'app/javascript/thirdparty/bootstrap.min.js',
          'bower_components/angular-bootstrap/angular-bootstrap.min.js',
          'bower_components/angular-ui-router/angular-ui-router.min.js',
          'bower_components/angular-sanitize/angular-sanitize.min.js',
          'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
          'bower_components/ng-file-upload/ng-file-upload.min.js',
          'app/javascript/thirdparty/canvas-to-blob.js',
          'app/javascript/thirdparty/cropper.js',
          'app/javascript/angularapps/openpicker/app_setup.js',
          'app/javascript/angularapps/openpicker/app_routes.js',
          'app/javascript/angularapps/common/directives.js',
          'app/javascript/angularapps/common/factories/log_service.js',
          'app/javascript/angularapps/common/factories/data_access_service.js',
          'app/javascript/angularapps/openpicker/services/options_service.js',
          'app/javascript/angularapps/openpicker/controllers/my_computer_controller.js',
          'app/javascript/angularapps/openpicker/controllers/image_edit_controller.js',
          'app/javascript/angularapps/openpicker/controllers/upload_controller.js',
          'app/javascript/angularapps/openpicker/controllers/primary_controller.js',
          'app/javascript/angularapps/openpicker/controllers/web_link_controller.js',
          'app/javascript/angularapps/openpicker/controllers/screenshot_controller.js',
          'app/javascript/angularapps/openpicker/controllers/fetched_file_preview_controller.js'
        ],
        dest: 'website/public/openpicker_app.js'
      }
    },

    watch: {
      all: {
        files: ['app/javascript/**/*.js'],
        tasks: ['concat']
      }
    }
  });

  grunt.registerTask('default', ['watch']);
};
