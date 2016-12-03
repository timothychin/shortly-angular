angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $window, $location, Links) {
  $scope.data = {};
  $scope.data.searchInput = '';

  $scope.updateData = function() {
    Links.getAll().then(function(links) {
      var sortedlinks = _.sortBy(links, function(link) {
        return link.visits;
      });
      $scope.data.links = sortedlinks.reverse();
      $scope.filterLinks();
    });
  };

  $scope.linkClickHandler = function(code) {
    Links.visitLink(code)
      .then(function(url) {
        $window.open(url, '_blank');
      });
    $scope.updateData();
  };

  $scope.filterLinks = function() {
    $scope.data.filteredLinks = $scope.data.links.filter(function(link) {
      return RegExp($scope.data.searchInput).exec(link.url) !== null ? true : false;
    });
  };

  $scope.updateData();
  $location.path('/links');
});
