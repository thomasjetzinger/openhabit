/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */
openHabitModule.controller('MenuController', ['$scope','$state', 'ModelService','$ionicHistory', function($scope, $state,ModelService,$ionicHistory) {

    $scope.sitemaps = ModelService.getSitemaps();
    $scope.$on('sitemaps:updated', function(event,data) {
        $scope.sitemaps = ModelService.getSitemaps();
    });

    $scope.goToSettings = function () {
        $state.go('app.loading.settings');
    };


    $scope.onClick = function(id) {
        ModelService.setCurrentSitemap(id.substring(4,id.length));
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });

        $state.go(id);
    }
}]);
