# weigh-in

App for family members to weigh themselves over time and track it.

##Tracks Users by weighins
user object contains name and array of weighins

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 1.0.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


## Hurdles 11/26/16

## generator showing signs of age
rolled back to bootstrap 3.3.4 due to bootstrap not seeing itself using bower to install. finally went with the CDN on the index


# Steps
## created factory for FB called FBfactory
 .factory('users', ["$firebaseArray", function ($firebaseArray) {..
This injects the users (every weigh in is inside a user object)


## create route for user list and get a userlist controller to process our FB factory data

yo angularfire:route userlist


## inject the user fb object into the userlist controller so that we can get the data
      .controller('UserlistCtrl', ['$scope', 'users',

      $scope.users = users;

## Nice Navigation class toggle state for Angular

http://stackoverflow.com/questions/16199418/how-to-set-bootstrap-navbar-active-class-with-angular-js

## create header controller to control our nav
yo angularfire:controller HeaderController


## direct route to user page by username

yo angularfire:route user --uri=users/:user


##inject the routeParams into the controller

    function ($scope, users, $routeParams) {

      // will be undefined until you click one
      console.log("routeParams.userName: " + $routeParams.userName);
      
      ## this is set in the userlist view
      
        <a href="/#/users/{{user.name}}">
        
      ## and in the routes.js
        .when('/users/:userName', {
              templateUrl: 'views/user.html',
              controller: 'UserlistCtrl'
            })
            
     ## and consumed in the UserlistCtrl
     
        $scope.userName = $routeParams.userName;

