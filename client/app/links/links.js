angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.search = '';
  $scope.data = {};

  $scope.refresh = function() {
    Links.getAll().then(function(links) {
      $scope.data.links = links;
    });
  };

  $scope.refresh();

});
