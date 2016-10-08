angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};

  $scope.startLoad = function() {
    $scope.loading = true;
    $scope.error = false;
    $scope.message = '';
  };

  $scope.endLoad = function(err, link) {
    $scope.loading = false;
    $scope.error = !!err;
    $scope.fetched = !!link;
    $scope.link = link || {};
  };

  $scope.addLink = function(url) {
    if (Links.isValid(url)) {
      $scope.startLoad();
      Links.addOne({ url: url }).then(function (response) {
        $scope.endLoad(null, response.data);
      }).catch(function (response) {
        $scope.endLoad(response.data);
      });
    } else {
      $scope.endLoad(true);
    }
  };
});
