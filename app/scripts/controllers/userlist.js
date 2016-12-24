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
                theUser.bmi = $scope.getUserBMI(theUser.height, theUser.weight );
                theUser.weightclass = $scope.getUserWeightClass(theUser.bmi);
                theUser.pft = $scope.roundNum(theUser.currentWeight - theUser.target, 2),
                // get pft
                $scope.labels.push(theUser.currentDate);
                $scope.data.push(theUser.currentWeight);
                //$scope.colors = ["rgba(227,93,14,0.5)","rgba(22,157,255,0.7)","rgba(255,185,0,0.5)"];

               $scope.colors = [
                  {
                    backgroundColor: "rgba(227,93,14,0.5)",
                    pointBackgroundColor: "rgba(255,185,0,0.7)", // only color that works
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
        var currentDate =  new Date();
        var date =  currentDate.toLocaleDateString();
        var time =  currentDate.toLocaleTimeString();
        $scope.currentTime = String(date + " " + time);
        //console.log($scope.currentTime);
        // Set the BMI

        $scope.user.bmi = $scope.getUserBMI($scope.user.height, $scope.user.weight );
        $scope.user.weightclass = $scope.getUserWeightClass($scope.user.bmi);

        $scope.users.$add({
            name: $scope.user.name,
            age: $scope.user.age,
            height: $scope.user.height,
            weight: $scope.user.weight,
            startweight: $scope.user.weight,
            ath: $scope.user.weight,
            atl: $scope.user.weight,
            target: $scope.user.target,
            progress: Number(0),
            poundslost: Number(0),
            pft: $scope.roundNum($scope.user.weight - $scope.user.target, 2),
            spft: $scope.roundNum($scope.user.weight - $scope.user.target, 2),
            start: $scope.currentTime,
            bmi: $scope.user.bmi,
            weightclass: $scope.user.weightclass,
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

        var currentDate =  new Date();
        var date =  currentDate.toLocaleDateString();
        var time =  currentDate.toLocaleTimeString();
        $scope.currentTime = String(date + " " + time);
        //console.log($scope.currentTime);

        var currentWeighin = {
          date: $scope.currentTime, weight: obj.weight
        }

        if ($scope.currentUser.$id == obj.$id) {
            $scope.currentUser.weighins.push(currentWeighin);

          // update current weight bmi weightclass update pft
          $scope.currentUser.weight = obj.weight;
          if($scope.currentUser.weight > $scope.currentUser.ath) {$scope.currentUser.ath = $scope.currentUser.weight};
          if($scope.currentUser.weight < $scope.currentUser.atl) {$scope.currentUser.atl = $scope.currentUser.weight};
          $scope.currentUser.poundslost =  $scope.roundNum($scope.currentUser.startweight - $scope.currentUser.weight, 2);
          if($scope.currentUser.poundslost < 0) {$scope.currentUser.poundslost = 0};
          $scope.currentUser.pft =  $scope.roundNum($scope.currentUser.weight - $scope.currentUser.target, 2);
          $scope.currentUser.progress = Number(Math.floor(100 - (($scope.currentUser.pft / $scope.currentUser.spft) * 100)));
          if($scope.currentUser.progress < 0) {$scope.currentUser.progress = 0};
          $scope.currentUser.bmi =  $scope.getUserBMI($scope.currentUser.height, $scope.currentUser.weight);
          $scope.currentUser.weightclass = $scope.getUserWeightClass($scope.currentUser.bmi);

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

      $scope.getUserBMI = function(h,w) {
        // metric conversion for weight
        var wik = w * 0.45;
        var him = h * 0.025;
        var him2 = him * him;
        //use roundnum func for custom decimals (val, decimals)
        $scope.bmi = $scope.roundNum(wik/him2, 2);

        return $scope.bmi;


      }

      $scope.getUserWeightClass = function(n) {

        //18 and under is underweight
        if (n < 18.5) {
          $scope.weightclass = String("Underweight");
          return $scope.weightclass;

        } else if (n > 18.5 && n <= 24.9) {
          //18.5 - 24.9 normal
          $scope.weightclass = String("Normal");
          return $scope.weightclass;

        } else if (n > 24.9 && n <= 29.9) {
          // 25-29.9 overweight
          $scope.weightclass = String("Overweight");
          return $scope.weightclass;

        } else if (n > 29.9 && n <= 39.9) {
          // 30 -39.9 obese
          $scope.weightclass = String("Obese");
          return $scope.weightclass;

        } else if (n > 40) {
          //40+ morbidly obese
          $scope.weightclass = String("Morbidly obese");
          return $scope.weightclass;

        } else {
          return;
        }

      }

      $scope.roundNum = function (value, decimals) {
          return Number(Math.round(value+'e'+decimals)+'e-'+decimals);

      }




    }]);



