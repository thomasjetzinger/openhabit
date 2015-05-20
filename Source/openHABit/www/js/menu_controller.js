/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */
openHabitModule.controller('MenuController', ['$scope','$state', 'ModelService','$ionicHistory', function($scope, $state,ModelService,$ionicHistory) {

    $scope.sitemaps = ModelService.getSitemaps();
    $scope.$on('sitemaps:updated', function(event,data) {
        $scope.sitemaps = ModelService.getSitemaps();
    });

    $scope.onClick = function(id) {
        console.log(id);
        ModelService.setCurrentSitemap(id);
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });

        $state.go(id);
    }
}]);
