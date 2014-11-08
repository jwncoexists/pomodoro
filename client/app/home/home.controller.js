app = angular.module('pomodoroApp');

app.controller('HomeCtrl', ['$scope', '$interval', function($scope, $interval) {
  console.log('In HomeCtrl');
  $scope.timers = {
    curTimerObj: null,
    workTimer: { 
      name: "work", 
      length: 1500, 
      duration: 0, 
      paused: false,
      soundPath: "/assets/sounds/work",
      imageFile: "/assets/images/work.jpg" 
    },
    breakTimer: { 
      name: "break", 
      length: 300, 
      duration: 0,
      paused: false,
      soundPath: "/assets/sounds/break",
      imageFile: "/assets/images/break.jpg" }
  };
  
  $scope.timers.workTimer.sound = new buzz.sound( $scope.timers.workTimer.soundPath, 
  {
      formats: ['wav'],
      preload: true
  });

  $scope.timers.breakTimer.sound = new buzz.sound( $scope.timers.breakTimer.soundPath, 
  {
      formats: ['wav'],
      preload: true
  });


  $scope.launchInterval = function() {
    console.log('launching work interval');
    $scope.timerInterval = $interval(function()
    {
       $scope.checkCurTimer();
     }, 1000);
  };

  $scope.startTimer = function(timerObj) {
    if (!timerObj.paused) {
      timerObj.duration = timerObj.length;
    }
    timerObj.paused = false;
    $scope.timers.curTimerObj = timerObj;
    $scope.startPauseText = "Pause Timer";
    $scope.launchInterval();
  };

  $scope.resetTimer = function(timerObj) {
    timerObj.duration = timerObj.length;
    if (timerObj.paused) {
      $scope.launchInterval();
    }
    timerObj.paused = false;
    $scope.timers.curTimerObj = timerObj;
    $scope.startPauseText = "Pause Timer";
  };

  $scope.stopTimer = function(timerObj) {
    timerObj.duration = 0;
    timerObj.paused = false;
    $scope.timers.curTimerObj = null;
    $interval.cancel($scope.timerInterval);
    $scope.startPauseText = "Start Timer";
  };

  $scope.pauseTimer = function(timerObj) {
    console.log('Pausing timer');
    $interval.cancel($scope.timerInterval);
    timerObj.paused = true;
    $scope.startPauseText = "Start Timer";
  };

  $scope.switchTimers = function(timerObj) {
    console.log('in Switch Timers')
    var nextTimerObj = $scope.timers.workTimer;
    if ($scope.timers.curTimerObj) {
      $scope.stopTimer($scope.timers.curTimerObj);
    }
    $scope.startTimer(timerObj);
    $scope.curView = timerObj.name;
  };

  $scope.startPauseTimer = function(timerObj) {
    console.log('in Start/Pause Timer')
    // if we have a currentTimerObj, then timer is running
    if (timerObj.paused) {
      $scope.startTimer(timerObj);
      
    }
    else {
      $scope.pauseTimer(timerObj);
    }

  };

  $scope.timeRemaining = function() {
    var remaining = 0;
    if ($scope.timers.curTimerObj) {
      remaining = $scope.timers.curTimerObj.duration;
    }
    return remaining;
  };

  $scope.checkCurTimer = function() {
    if ($scope.timers.curTimerObj) {
      $scope.timers.curTimerObj.duration--;
      if ($scope.timers.curTimerObj.duration <= 0) {
        $scope.timers.curTimerObj.sound.play();
        $scope.stopTimer($scope.timers.curTimerObj);
      }
    } 
  }; // checkCurTimer


  var init = function() {
    $scope.switchTimers($scope.timers.workTimer);
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