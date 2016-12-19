angular.module('firebase.config', [])
  .constant('FBURL', 'https://weighin-project.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
