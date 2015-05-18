/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */
openHabitModule.controller('MenuSitemapsController', ['$scope','$state', 'SiteMapContentService','$ionicHistory', function($scope, $state,SiteMapContentService,$ionicHistory) {

    $scope.sitemaps = SiteMapContentService.getSitemaps();
    $scope.$on('sitemaps:updated', function(event,data) {
        $scope.sitemaps = SiteMapContentService.getSitemaps();
    });

    $scope.onClick = function(id) {
        console.log(id);
        SiteMapContentService.setCurrentSitemap(id);
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });

        $state.go(id);
    }
}]);
