'use strict';

describe('Controller: MakepaymentCtrl', function () {

  // load the controller's module
  beforeEach(module('rnsuiApp'));

  var MakepaymentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MakepaymentCtrl = $controller('MakepaymentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MakepaymentCtrl.awesomeThings.length).toBe(3);
  });
});
