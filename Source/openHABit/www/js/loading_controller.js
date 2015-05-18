/**
 * Created by Thomas Jetzinger on 17/05/2015.
 */

openHabitModule.controller('LoadingController', ['$scope', '$state','Sitemaps', 'Sitemap', 'StateCreator',
    'SiteMapContentService', '$ionicViewService',
    function($scope, $state, Sitemaps, Sitemap, StateCreator, SiteMapContentService, $ionicViewService) {
        console.log("query sitemaps");
        var sitemap = Sitemap.query();

        $scope.sitemap = sitemap;

        $scope.sitemap.$promise.then(function (result) {
            $scope.sitemap = result;

            SiteMapContentService.reset();

            console.log("result received");
            // get homepage
            var homepage = result.homepage;

            iterateWidgets('app.' + homepage.id, homepage.widget, SiteMapContentService, StateCreator, $state);

            angular.forEach($state.get(), function(state) {
                console.log("state " + state.name);
            });

            $ionicViewService.nextViewOptions({
                disableBack: true
            });

            //TODO go to state homepage.id
            $state.go("app.demo.demo_0.0000");
        });

    }]);

function iterateWidgets(stateName, widgets, SiteMapContentService, StateCreator, $state) {

    SiteMapContentService.addItem(stateName, widgets);

    var newState = StateCreator.createState(stateName, stateName);

    if($state.get(stateName) == null) {
        openHabitModule.stateProvider.state(stateName, newState);
        console.log("create state " + stateName);
    }

    angular.forEach(widgets, function(widget) {

        if(widget.type == "Frame") {
            iterateWidgets(stateName + "." + widget.widgetId, widget.widget, SiteMapContentService, StateCreator, $state);
        } else if(widget.linkedPage) {
            iterateWidgets(stateName + "." + widget.linkedPage.id, widget.linkedPage.widget, SiteMapContentService, StateCreator, $state);
        }

    });
}