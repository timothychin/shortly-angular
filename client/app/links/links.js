angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $window, $location, Links) {
  $scope.data = {};

  $scope.updateData = function() {
    Links.getAll().then(function(links) {
      var sortedlinks = _.sortBy(links, function(link) {
        return link.visits;
      });
      $scope.data.links = sortedlinks.reverse();
    });
  };

  $scope.linkClickHandler = function(code) {
    Links.visitLink(code)
      .then(function(url) {
        $window.open(url, '_blank');
      });
    $scope.updateData();
  };

  $scope.updateData();
  $location.path('/links');
});
