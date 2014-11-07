'use strict';

angular.module('pomodoroApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          "main@": {
            templateUrl: '/app/home/home.html',
            controller: 'HomeCtrl' }
        } // views
      }); // .state home
  });//.config