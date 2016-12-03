angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $window, $location, Links) {
  $scope.data = {};

  Links.getAll().then(function(links) {
    $scope.data.links = links;
  });

  $scope.urlRedirect = function(url) {
    $window.location.href = url;
  };

  $location.path('/links');
});
