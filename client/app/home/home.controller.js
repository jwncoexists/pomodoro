app = angular.module('pomodoroApp');

app.controller('HomeCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  console.log('In HomeCtrl');
  $scope.test = "hello world";
  $scope.timers = {
    curTimerObj: null,
    workTimer: { 
      name: "work", 
      duration: 1500000, 
      startTime: 0, 
      stopTime: 0, 
      soundPath: "/assets/sounds/work",
      imageFile: "/assets/images/work.jpg" 
    },
    breakTimer: { 
      name: "break", 
      duration: 300000, 
      startTime: 0, 
      stopTime: 0, 
      soundPath: "/assets/sounds/break",
      imageFile: "/assets/images/break.jpg" }
  };
  
  $scope.timers.breakTimer.sound = new buzz.sound( $scope.timers.breakTimer.soundPath, 
  {
      formats: ['wav'],
      preload: true
  });

  $scope.whichView = function() {
    var view = "work";
    if($scope.timers.curTimerObj)
    {
      if($scope.timers.curTimerObj.name == "break")
      {
        view = "break";
      }
    }
    return (view);
  }
  $scope.timers.workTimer.sound = new buzz.sound( $scope.timers.workTimer.soundPath, 
  {
      formats: ['wav'],
      preload: true
  });

  $scope.startTimer = function(timerObj) {
    timerObj.startTime = moment();
    timerObj.stopTime = timerObj.startTime;
    $scope.timers.curTimerObj = timerObj;
  };

  $scope.stopTimer = function(timerObj) {
    timerObj.stopTime = moment();
    $scope.timers.curTimerObj = null;
    $interval.cancel($scope.timerInterval);
  };

  $scope.switchTimers = function() {
    var nextTimerObj = $scope.timers.workTimer;
    if ($scope.timers.curTimerObj) {
      if ($scope.timers.curTimerObj.name == "work") {
        nextTimerObj = $scope.timers.breakTimer;
      }
      stopTimer($scope.timers.curTimerObj);
    }
    $scope.startTimer(nextTimerObj);
  };

  $scope.timeRemaining = function() {
    var remaining = 0;
    if ($scope.timers.curTimerObj) {
      var curTimer = $scope.timers.curTimerObj;
      if (curTimer.startTime > 0) {
        console.log("duration: " + curTimer.duration);
        console.log("start time: " + curTimer.startTime);
        remaining = (curTimer.duration - (moment() - moment(curTimer.startTime)))/1000;
      }
    }
    return remaining;
  };

  $scope.checkCurTimer = function() {
    if ($scope.timers.curTimerObj) {
      if ($scope.timers.curTimerObj.startTime > 0 && $scope.timeRemaining() <= 0) {
        $scope.timers.curTimerObj.sound.play();
        $scope.stopTimer($scope.timers.curTimerObj);
      }
    } 
  }; // checkCurTimer

  $scope.launchInterval = function() {
    console.log('launching work interval');
    $scope.timerInterval = $interval(function()
    {
       $scope.checkCurTimer();
     }, 1000);
  };

  var init = function() {
    $scope.switchTimers();
    $scope.timerInterval = $scope.launchInterval();
  }

  init();

}]); // HomeCtrl

// ********************** FILTERS ************************

app.filter('timecode', function() {
   return function(seconds) {

     seconds = Number.parseFloat(seconds);
     // Returned when no time is provided.
     if (Number.isNaN(seconds)) {
       return '--:--';
     }
 
     // make it a whole number
     var wholeSeconds = Math.floor(seconds); 
     var numMinutes = Math.floor(((wholeSeconds % 86400) % 3600) / 60);
     var numSeconds = ((wholeSeconds % 86400) % 3600) % 60;

     var output = "";

     // zero-pad minutes
     if (numMinutes < 10) {
          output += '0';
     }
     output += numMinutes + ':';
 
     // output seconds
     if (numSeconds < 10) {
       output += '0';
     }
     output += numSeconds;

     return output;
   }
});