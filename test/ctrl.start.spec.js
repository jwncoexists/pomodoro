var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();


describe('Controller: HomeCtrl', function() {
  var scope;
  var ctrl;
  var $interval;

  beforeEach(module('pomodoroApp'));

  beforeEach(inject(function($rootScope, _$interval_, $controller ) {
    scope = $rootScope.$new();
    $interval = _$interval_;
    ctrl = $controller('HomeCtrl', {'$scope': scope, '$interval': $interval});
  }));

  console.log(ctrl);
  expect(ctrl.mytext).toEqual('You did it!')
  //expect(scope.timers.curTimerObj.name).toEqual('work');

  /* it("should be defined", function() {
    expect(scope.startTimer()).to.exist;
  }); */

});

// just see if we can get test to run
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});