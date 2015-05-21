/**
 * Created by Thomas Jetzinger on 17/05/2015.
 */

openHabitModule.controller('LoadingController',
    function ($scope, $rootScope, $state, Sitemaps, Sitemap, StateCreator, ModelService, Page, $ionicHistory, $ionicLoading) {

        $scope.retry = function () {
            console.log("LoadingController: query sitemaps");
            $scope.isLoading = true;
            $scope.isError = false;
            Sitemaps.query().$promise.then(requestSuccess, requestError);
        };

        // load the first time
        //$scope.retry();
        $scope.isLoading = false;
        $scope.goToSettings = function () {
            $state.go('app.loading.settings');
        };


        function requestSuccess(sitemaps_result) {
            $scope.isError = false;
            console.log("LoadingController: request success!");
            var index = 0;
            // create array if sitemap_result has only one sitemap
            if (angular.isArray(sitemaps_result.sitemap) === false)
                sitemaps_result.sitemap = [sitemaps_result.sitemap];

            angular.forEach(sitemaps_result.sitemap, function (sitemap) {
                var sitemap_content = Sitemap(sitemap.link).query();
                sitemap_content.$promise.then(function (sitemap_content_result) {
                    // get homepage
                    var homepage = sitemap_content_result.homepage;
                    var widgetCollection = [];

                    iterateWidgets('app.' + homepage.id, homepage.widget, $state, widgetCollection, true, undefined);
                    console.log("result received for app " + widgetCollection.length);

                    sitemaps_result.sitemap[index].widgetCollection = widgetCollection;
                    sitemaps_result.sitemap[index].id = 'app.' + homepage.id;

                    index = index + 1;

                    if (index >= sitemaps_result.sitemap.length) {
                        ModelService.setSitemaps(sitemaps_result.sitemap);
                        ModelService.setCurrentSitemap(homepage.id);
                        $rootScope.$broadcast('sitemaps:updated', sitemaps_result.sitemap);
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $scope.isLoading = false;
                        $state.go('app.' + homepage.id);
                    }
                });

            });
        }

        function requestError(error) {
            $scope.isLoading = false;
            $scope.isError = true;

            console.log("LoadingController: request error!\n" + error);

        }


        function iterateWidgets(stateName, widgets, $state, widgetCollection, createNewState, parent) {

            if (createNewState === true) {

                if (stateName in widgetCollection)
                    widgetCollection[stateName].push(widgets);
                else
                    widgetCollection[stateName] = widgets;

                var newState = StateCreator.createState(stateName, parent ? parent.label : "Home");

                if ($state.get(stateName) == null)
                    openHabitModule.stateProvider.state(stateName, newState);
            }

            if (angular.isArray(widgets) === false)
                widgets = [widgets];

            angular.forEach(widgets, function (widget) {

                //console.log(widget.widgetId);

                if (widget.linkedPage) {
                    iterateWidgets(stateName + "." + widget.linkedPage.id, widget.linkedPage.widget, $state, widgetCollection, true, widget);
                } else if (widget.widget) {
                    if (widget.type === "Frame")
                    // Frames are flattered, so don't add them to the state collection
                        iterateWidgets(stateName, widget.widget, $state, widgetCollection, false, widget);
                    else
                        iterateWidgets(stateName + "." + widget.widgetId, widget.widget, $state, widgetCollection, true, widget);
                }
            });
        }

    });



