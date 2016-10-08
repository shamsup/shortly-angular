angular.module('shortly.navigation', [])

.controller('NavigationController', function ($scope, $location, Auth) {
  $scope.location = $location;
  $scope.view = $location.path();
  $scope.signout = function(e) {
    Auth.signout();
    e && e.preventDefault();
  };
});
