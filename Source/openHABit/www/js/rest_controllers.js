/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */
controllerModule.controller('SitemapsController', ['$scope', 'Sitemaps', function($scope, Sitemaps) {
    $scope.sitemaps = Sitemaps.query();
}]);
