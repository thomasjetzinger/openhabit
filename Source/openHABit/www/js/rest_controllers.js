/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */
openHabitModule.controller('SitemapsController', ['$scope', 'Sitemaps', function($scope, Sitemaps) {
    $scope.sitemaps = Sitemaps.query();
}]);

openHabitModule.controller('SitemapsController', ['$scope', 'Sitemap', function($scope, Sitemap) {
    $scope.sitemap = Sitemap.query();
}]);
