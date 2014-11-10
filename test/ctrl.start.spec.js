var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();


describe('Controller: HomeCtrl', function() {
  var clock;
  buzz = {
    sound: function(path) {},
    play: function(sound) {},
  };

  beforeEach(module('pomodoroApp'));

  beforeEach(inject(function($controller, $rootScope, _$interval_) {
    scope = $rootScope.$new();
    interval = _$interval_;
    ctrl = $controller('HomeCtrl', {$scope: scope, $interval: interval});
  }));

  beforeEach(function () { clock = sinon.useFakeTimers(); });
  afterEach(function () { clock.restore(); });

  it('should initialize the test string', function() {
    expect(scope.testStr).to.contain("Hello world");
  });

  it('should automatically start the work timer', function() {
    expect(scope.timers.curTimerObj).to.equal(scope.timers.workTimer);
  });

  it('should be able to pause the current timer', function() {
    scope.resetTimer(scope.timers.curTimerObj); // restart current timer in case it stopped
    scope.pauseTimer(scope.timers.curTimerObj); // pause the timer
    var timeRemaining1 = scope.timeRemaining(); // get the amount of time remaining when paused
    clock.tick(5000); // wait 5 seconds
    var timeRemaining2 = scope.timeRemaining(); // get time remaining again
    expect(timeRemaining1).to.not.equal(0);
    expect(timeRemaining1).to.equal(timeRemaining2); // compare timeremaining1 & timeRemaing2
  });

  it('should be able to restart the current timer', function() {
    scope.resetTimer(scope.timers.curTimerObj); // restart current timer in case it stopped
    var timeRemaining1 = scope.timeRemaining(); // get the amount of time remaining when paused
    expect(timeRemaining1).to.equal(scope.timers.curTimerObj.length);
  });

  it('should be able to switch the current timer', function() {
    scope.switchTimers(scope.timers.breakTimer); // restart current timer in case it stopped
    expect(scope.timers.curTimerObj).to.equal(scope.timers.breakTimer);
  });


});
