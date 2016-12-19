'use strict';

/**
 * @ngdoc function
 * @name weighInApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the weighInApp
 */
angular.module('weighInApp').config(['ChartJsProvider', function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    chartColors: ['#e35d0e', '#169DFF', '#FFB900', '#001EA5', '#A92A90'], // orange, cyan, yellow, navy, purple
    responsive: true
  });
  // Configure all line charts
  ChartJsProvider.setOptions('line', {
    showLines: true,
    fill: true,
    defaultFontColor: '#A92A90'
  });
}])
  .controller('UserlistCtrl', ['$scope', 'users', '$routeParams', '$location',
    function ($scope, users, $routeParams, $location ) {

      //console.log("UserlistCtrl :: routeParams: " + $routeParams);
      $scope.users = users;

      //Current Page routeParams
      $scope.userName = $routeParams.userName;

      $scope.users.$loaded()
        .then(function(){
          angular.forEach(users, function(users) {
            var theUser = users;
            var theUserID = users.$id;

            //console.log(">> theUserID: " + theUserID);
            // if there is a match in the route param
            if ( $scope.userName == users.name) {
              // we populate the currentUser with theUser data
              $scope.currentUser = theUser;
             // console.log('>> match ' + $scope.currentUser);

              $scope.labels = [];
              $scope.data = [];

              // Lets get Current Weight too
              angular.forEach(theUser.weighins, function (weighins) {
                theUser.currentWeight = weighins.weight;
                theUser.currentDate = weighins.date;
                $scope.labels.push(theUser.currentDate);
                $scope.data.push(theUser.currentWeight);
                //$scope.colors = ["rgba(227,93,14,0.5)","rgba(22,157,255,0.7)","rgba(255,185,0,0.5)"];

               $scope.colors = [
                  {
                    backgroundColor: "rgba(227,93,14,0.5)",
                    pointBackgroundColor: "rgba(255,185,0,0.7)",
                    pointHoverBackgroundColor: "rgba(255,185,0, 0.8)",
                    borderColor: "rgba(0,30,165, 1)",
                    pointBorderColor: '#A92A90',
                    pointHoverBorderColor: "rgba(169,42,144, 1)"
                  },"rgba(169,42,144,0.5)","#001EA5","rgb(233,177,69)"
                ],

                $scope.options = {
                  borderJoinStyle: 'miter',
                  pointBorderWidth: 3,
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero:true
                      },
                      stacked: true,
                      display: true,
                      position: 'left'
                    }],
                    xAxes: [{
                      display: true,
                      position: 'bottom',
                      fontColor: '#A92A90'
                    }]
                  }
                };

                //console.log("2.theUser.currentWeight = " + theUser.currentWeight + " " + theUser.currentDate);
              });
            }
          })
        });

      //methods
      $scope.addUser = function() {
        // Get Date and Time

        $scope.currentTime =  String(new Date());
        console.log('addUser: currentTime: ' + $scope.currentTime);
      //  var convertedTime = new Date($scope.currentTime);
      //  var currentDate = String(convertedTime);

        $scope.users.$add({
            name: $scope.user.name,
            age: $scope.user.age,
            height: $scope.user.height,
            weight: $scope.user.weight,
            avatar: $scope.user.avatar,
            weighins:[{date: $scope.currentTime , weight: $scope.user.weight}]
        });

        $location.path('/userlist');
      }

      $scope.removeUser = function (obj) {
      // console.log("removeUser: " + obj.$id);
         $scope.users.$remove(obj);
      }

      $scope.saveUser = function (obj) {

        $scope.currentTime =  String(new Date());
        //var date =  $scope.currentTime.toLocaleDateString();
        //var time =  $scope.currentTime.toLocaleTimeString();
        //console.log('date: ' + date + ' time: ' + time);

        var currentWeighin = {
          date: $scope.currentTime, weight: obj.weight
        }

        if ($scope.currentUser.$id == obj.$id) {
            $scope.currentUser.weighins.push(currentWeighin);
          // update chart
            $scope.labels.push($scope.currentTime);
            $scope.data.push(obj.weight);
          // Save to Firebase
            $scope.users.$save($scope.currentUser)
            //console.log("saveuser: currentUser.weighins: " + $scope.currentUser.weighins);
        } else {
            console.log('error');
        }


      }

    }]);



