openHabitModule.controller('mainController', function ($scope, $state, sitemapContent, sitemapName, pageTitle, Item, Page, ModelService, $websocket, $localStorage) {


    $scope.pageId = sitemapName.substr(sitemapName.lastIndexOf(".") + 1);
    var page = Page($scope.pageId).query();

    page.$promise.then(function (page) {
        ModelService.setItem(page.id, page.widget);
        $scope.sitemapData = ModelService.getItem($scope.pageId);
    });

    $scope.sitemapData = sitemapContent;
    $scope.sitemapName = sitemapName;
    $scope.pageTitle = pageTitle;

    $scope.navigateTo = function (path) {
        console.log("Navigate to " + path);
        $state.go(path);
    };

    $scope.onSwitchChange = function (item) {
        console.log(item + " change");
        itemObj = JSON.parse(item);
        Item(itemObj.item.link).update(itemObj.item.state == "ON" ? "OFF" : "ON"); // only for testing
    };

    $scope.$on('$ionicView.enter', function() {
        // Code you want executed every time view is opened
        console.log(sitemapName+ ' Opened!')
        if($scope.ws === undefined){
            //todo gen unique tracking id
            console.log('ws://'+$localStorage.url+'/rest/sitemaps/'+ModelService.getCurrentSitemapId()+'/'+$scope.pageId+'?X-Atmosphere-tracking-id=a5c1f99f-e88b-3266-cbce-f461bfbfe14d&X-Atmosphere-Framework=0.9&X-Atmosphere-Transport=websocket&X-Cache-Date=0&Accept=application%2Fjson');

            $scope.ws = $websocket.$new('ws://'+$localStorage.url+'/rest/sitemaps/'+ModelService.getCurrentSitemapId()+'/'+$scope.pageId+'?X-Atmosphere-tracking-id=a5c1f99f-e88b-3266-cbce-f461bfbfe14d&X-Atmosphere-Framework=0.9&X-Atmosphere-Transport=websocket&X-Cache-Date=0&Accept=application%2Fjson'); // instance of ngWebsocket, handled by $websocket service

            $scope.ws.$on('$open', function () {
                console.log(sitemapName+' Websocket is open!');

            });


            $scope.ws.$on('$message', function (data) {
                console.log('$message The websocket server has sent the following data:');
                console.log(data);

                if (data.widget) {
                    ModelService.setItem(data.widget.widgetId, data.widget);
                    $scope.$apply(function () {
                        $scope.sitemapData = ModelService.getItem($scope.pageId);
                    });

                }
            });

            $scope.ws.$on('$close', function () {
                console.log(sitemapName + 'Websocket closed!');
            });


        }

    });

    $scope.$on('$ionicView.leave', function() {
        // Code you want executed every time view is opened
        console.log(sitemapName+' exit!')
        if($scope.ws !== undefined) {
            $scope.ws.$close();
        }
    });







    //$scope.$on('sitemaps_content:updated', function (event, data) {
    //    $scope.$apply(function () {
    //        $scope.sitemapData = ModelService.getItem($scope.pageId);
    //    });
    //});


});
