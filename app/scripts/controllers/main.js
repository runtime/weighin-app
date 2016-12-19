'use strict';

/**
 * @ngdoc function
 * @name weighInApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weighInApp
 */
angular.module('weighInApp')
  .controller('MainCtrl', ['$scope', 'users',
    function ($scope, users) {

      console.log("MainCtrl");

      $scope.users = users;
    //  console.log($scope.users);

  }]);




