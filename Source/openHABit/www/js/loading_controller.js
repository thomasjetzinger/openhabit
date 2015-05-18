/**
 * Created by Thomas Jetzinger on 17/05/2015.
 */

openHabitModule.controller('LoadingController', ['$scope', '$rootScope', '$state', 'Sitemaps', 'Sitemap', 'StateCreator',
    'SiteMapContentService', '$ionicHistory',
    function ($scope, $rootScope, $state, Sitemaps, Sitemap, StateCreator, SiteMapContentService, $ionicHistory) {
        console.log("query sitemaps");
        var sitemaps = Sitemaps.query();

        sitemaps.$promise.then(function (sitemaps_result) {
            var index = 0;
            angular.forEach(sitemaps_result.sitemap, function (sitemap) {
                var sitemap_content = Sitemap(sitemap.link).query();
                sitemap_content.$promise.then(function (sitemap_content_result) {





                    // get homepage
                    var homepage = sitemap_content_result.homepage;
                    console.log("result received for app " + sitemap_content_result);
                    var widgetCollection = [];
                    iterateWidgets('app.' + homepage.id, homepage.widget, StateCreator, $state, widgetCollection);
                    sitemaps_result.sitemap[index].widgetCollection = widgetCollection;
                    sitemaps_result.sitemap[index].id = 'app.' + homepage.id;
                    //angular.forEach($state.get(), function(state) {
                    //    console.log("state " + state.name);
                    //});

                    index = index +1;

                    if(index >= sitemaps_result.sitemap.length){
                        SiteMapContentService.setSitemaps(sitemaps_result.sitemap);
                        $rootScope.$broadcast('sitemaps:updated', sitemaps_result.sitemap);
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $state.go("app."+homepage.id);
                    }
                });

            });








        });

    }]);

function iterateWidgets(stateName, widgets, StateCreator, $state, widgetCollection ) {


    if(stateName in widgetCollection)
        widgetCollection[stateName].push(widgets);
    else
        widgetCollection[stateName] = widgets;

    var newState = StateCreator.createState(stateName);

    if ($state.get(stateName) == null) {
        openHabitModule.stateProvider.state(stateName, newState);
        console.log("create state " + stateName);
    }

    angular.forEach(widgets, function (widget) {

        if (widget.type == "Frame") {
            iterateWidgets(stateName + "." + widget.widgetId, widget.widget,  StateCreator, $state,widgetCollection);
        } else if (widget.linkedPage) {
            iterateWidgets(stateName + "." + widget.linkedPage.id, widget.linkedPage.widget,  StateCreator, $state,widgetCollection);
        }

    });
}