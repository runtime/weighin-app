'use strict';

/**
 * @ngdoc function
 * @name weighInApp.controller:HeadercontrollerCtrl
 * @description
 * # HeadercontrollerCtrl
 * Controller of the weighInApp
 */
angular.module('weighInApp')
  .controller('HeadercontrollerCtrl', function ($scope, $location) {
   $scope.isActive = function (viewLocation) {
     //console.log('HeadercontrollerCtrl:' + $location.path());
     return viewLocation === $location.path();
   };
  });



