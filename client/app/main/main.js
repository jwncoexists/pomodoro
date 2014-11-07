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
      $stateProvider
       .state('break', {
        url: '/break',
        views: {
          "main@": {
            templateUrl: '/app/break/break.html',
            controller: 'BreakCtrl' }
        } // views
      }); // .state break
  });//.config