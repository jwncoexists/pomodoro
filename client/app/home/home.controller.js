app = angular.module('pomodoroApp');

app.controller('HomeCtrl', ['$scope', '$http', '$interval', 'Timer', function($scope, $http, $interval, Timer) {
  console.log('In HomeCtrl');
}]);

app.controller('BreakCtrl', ['$scope', '$http', '$interval', 'Timer', function($scope, $http, $interval, Timer) {
  console.log('In BreakCtrl');
}]);


// ********************** SERVICES ************************

app.service('Timer', ['$rootScope', function($rootScope) {

  var timerService = {
    timers: [
      { type: "work", duration: 25, startTime: 0 },
      { type: "break", duration: 5, startTime: 0 }
    ],
    start: function(timer) {
      timer.startTime = moment();
    },
    stop: function(timer) {
      timer.startTime = 0;
    },
    switch: function() {

    },
    remainingTime: function(timer) {
      return (timer.duration - (moment() - moment(timer.startTime)))/1000;
    }

  };
  return timerService;
});  // Timer Directive


// ********************** FILTERS ************************

app.filter('timecode', function() {
  return function(seconds) {
    seconds = Number.parseFloat(seconds);

    if(Number.isNaN(seconds)) {
      return '-:--';
    }

    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    remainingSeconds = wholeSeconds % 60;

    output = minutes + ':';

    if(remainingSeconds < 10) {
      output += '0';
    }

    output += remainingSeconds;

    return output;
  }
});