/**
 * Created by Thomas Jetzinger on 17/05/2015.
 */

openHabitModule.controller('LoadingController', ['$scope', '$rootScope', '$state', 'Sitemaps', 'Sitemap', 'StateCreator',
    'SiteMapContentService', 'Page', '$ionicHistory',
    function ($scope, $rootScope, $state, Sitemaps, Sitemap, StateCreator, SiteMapContentService, Page, $ionicHistory) {
        console.log("query sitemaps");
        var sitemaps = Sitemaps.query();

        sitemaps.$promise.then(function (sitemaps_result) {
            var index = 0;
            // create array if sitemap_result has only one sitemap
            if(angular.isArray(sitemaps_result.sitemap) === false)
                sitemaps_result.sitemap = [sitemaps_result.sitemap];

            angular.forEach(sitemaps_result.sitemap, function (sitemap) {
                var sitemap_content = Sitemap(sitemap.link).query();
                sitemap_content.$promise.then(function (sitemap_content_result) {
                    // get homepage
                    var homepage = sitemap_content_result.homepage;
                    var widgetCollection = [];

                    console.log("result received for app " + sitemap_content_result);

                    iterateWidgets('app.' + homepage.id, homepage.widget, StateCreator, $state, widgetCollection, true);
                    sitemaps_result.sitemap[index].widgetCollection = widgetCollection;
                    sitemaps_result.sitemap[index].id = 'app.' + homepage.id;

                    index = index + 1;

                    if(index >= sitemaps_result.sitemap.length){
                        SiteMapContentService.setSitemaps(sitemaps_result.sitemap);
                        $rootScope.$broadcast('sitemaps:updated', sitemaps_result.sitemap);
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $state.go('app.' + homepage.id);
                    }
                });

            });
        });

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                console.log("from " + fromState + " to " + toState);

                //var page = SiteMapContentService.getItem(toState.name);

                var page = Page(toState.name.substr(toState.name.lastIndexOf(".") + 1)).query();

                page.$promise.then(function (page) {
                    SiteMapContentService.setItem('app.' + page.id, page.widget);
                });

            });
    }]);

function iterateWidgets(stateName, widgets, StateCreator, $state, widgetCollection, createNewState) {

    if (createNewState === true) {

        if (stateName in widgetCollection)
            widgetCollection[stateName].push(widgets);
        else
            widgetCollection[stateName] = widgets;

        var newState = StateCreator.createState(stateName);

        if ($state.get(stateName) == null) {
            openHabitModule.stateProvider.state(stateName, newState);

            console.log("create state " + stateName);

        }
    }

    if(angular.isArray(widgets) === false)
        widgets = [widgets];

    angular.forEach(widgets, function (widget) {

        console.log(widget.widgetId);

        if (widget.linkedPage) {
            iterateWidgets(stateName + "." + widget.linkedPage.id, widget.linkedPage.widget, StateCreator, $state,widgetCollection, true);
        } else  if(widget.widget) {
            if(widget.type === "Frame")
                // Frames are flattered, so don't add them to the state collection
                iterateWidgets(stateName, widget.widget, StateCreator, $state,widgetCollection, false);
            else
                iterateWidgets(stateName + "." + widget.widgetId, widget.widget, StateCreator, $state,widgetCollection, true);
        }
    });
}