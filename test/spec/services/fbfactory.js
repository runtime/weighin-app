'use strict';

describe('Service: FBFactory', function () {

  // load the service's module
  beforeEach(module('weighInApp'));

  // instantiate service
  var FBFactory;
  beforeEach(inject(function (_FBFactory_) {
    FBFactory = _FBFactory_;
  }));

  it('should do something', function () {
    expect(!!FBFactory).toBe(true);
  });

});
