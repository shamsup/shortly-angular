angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links, LinkList) {
  $scope.search = '';
  $scope.data = {};
  $scope.data.links = LinkList;
  // $scope.refresh = function() {
  //   Links.getAll().then(function(links) {
  //     $scope.data.links = links;
  //   });
  // }

});
