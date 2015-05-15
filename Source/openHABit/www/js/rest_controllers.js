/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */
openHabitModule.controller('SitemapsController', ['$scope', 'Sitemaps', function($scope, Sitemaps) {
    $scope.sitemaps = Sitemaps.query();
}]);

openHabitModule.controller('SitemapsController', ['$scope', 'Sitemap', function($scope, Sitemap) {
    $scope.sitemap = Sitemap.query();
}]);

openHabitModule.controller('LoadingController', ['$scope', '$state','Sitemaps', 'Sitemap', 'StateCreator',
    'SiteMapContentService',
    function($scope, $state, Sitemaps, Sitemap, StateCreator, SiteMapContentService) {
        console.log("query sitemaps");
        var sitemap = Sitemap.query();

        $scope.sitemap = sitemap;

        $scope.sitemap.$promise.then(function (result) {
            $scope.sitemap = result;

            SiteMapContentService.reset();

            console.log("result received");
            // get homepage
            var homepage = result.homepage;

            iterateWidgets('app.' + homepage.id, homepage.widget, SiteMapContentService, StateCreator);

            console.log("go to state app.main");
            $state.go("app.main");

        });

}]);

function iterateWidgets(state, widgets, SiteMapContentService, StateCreator) {

    SiteMapContentService.addItem(state, widgets);

    angular.forEach(widgets, function(widget) {
        console.log("widget label: " + widget.label);

        if(widget.type == "Frame") {
            iterateWidgets(state + "." + widget.widgetId, widget.widget, SiteMapContentService, StateCreator);
        } else if(widget.linkedPage) {
            // create new state name
            var newStateName = state + "." + widget.linkedPage.id;
            var newState = StateCreator.createState(state, newStateName);

            openHabitModule.stateProvider.state(newState.name, newState);

            iterateWidgets(newStateName, widget.linkedPage.widget, SiteMapContentService, StateCreator);
        }

    });
}
