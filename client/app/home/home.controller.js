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
    timers: {
      curTimer: "work",
      work: { duration: 25, startTime: 0, stopTime: 0 },
      break: { duration: 25, startTime: 0, stopTime: 0 }
    };
      
    start: function(timerObj) {
      timerObj.startTime = moment();
      timerObj.stopTime = timerObj.startTime;
    },
    stop: function(timerObj) {
      timerObj.stopTime = moment();
    },
    switchTimers: function() {
      if (timers.curTimer == "work") {
        timers.curTimer = "break";
      }
      else {
        timers.curTimer = "work";
      }
    },
    getCurTimerObj() {
      return( timers[timers.curTimer] );
    }

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