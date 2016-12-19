'use strict';

/**
 * @ngdoc service
 * @name weighInApp.FBFactory
 * @description
 * # FBFactory
 * Factory in the weighInApp.
 */



angular.module('weighInApp')
  .factory('users', ['$firebaseArray', 'FBURL', function ($firebaseArray, FBURL) {
    // Service logic
    // ...
    // FBURL was from config.js when we configured our FB url
   // var ref = new Firebase(FBURL);
    // instead we'll create a new one directly with users
    var ref = new Firebase('/https://weighin-project.firebaseio.com/users');


    return $firebaseArray(ref);


  }]);



//angular.module('weighInApp')
//  .factory('users', ["$firebaseArray", function ($firebaseArray) {
//    // Service logic
//    // ...
//    var ref = new Firebase('/https://weighin-project.firebaseio.com/users');
//    // var ref = new Firebase('/https://mccann-case-studies.firebaseio.com/cases');
//
//    return $firebaseArray(ref);
//
//
//
//  }]);






