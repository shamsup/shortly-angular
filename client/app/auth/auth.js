// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.error = false;
  $scope.message = '';
  $scope.signin = function () {
    if (!$scope.signinForm || $scope.signinForm.$valid) {
      Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        $scope.error = true;
        $scope.message = error.data.error;
        $scope.user.password = '';
      });
    }
  };

  $scope.signup = function () {
    if (!$scope.signupForm || $scope.signupForm.$valid) {
      Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        $scope.error = true;
        $scope.message = error.data.error;
      });
    }
  };
});
