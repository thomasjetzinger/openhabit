openHabitModule.controller('mainController', function ($rootScope, $scope, $state, sitemapContent, sitemapName, pageTitle, Item, Page, ModelService, $websocket, $localStorage) {

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
        console.log(sitemapName+ ' entered!');

        if($rootScope.ws) {
            console.log('status: ' + $rootScope.ws.$status());
            console.log("close websocket");
            $rootScope.ws.$un('$message');
            //$rootScope.ws.$close();
        }


        //todo gen unique tracking id
        console.log('ws://'+$localStorage.url+'/rest/sitemaps/'+ModelService.getCurrentSitemapId()+'/'+$scope.pageId+'?X-Atmosphere-tracking-id=a5c1f99-e88b-3266-cbce-f461bfbfe14d&X-Atmosphere-Framework=0.9&X-Atmosphere-Transport=websocket&X-Cache-Date=0&Accept=application%2Fjson');

        $rootScope.ws = $websocket.$new('ws://'+$localStorage.url+'/rest/sitemaps/'+ModelService.getCurrentSitemapId()+'/'+$scope.pageId+'?X-Atmosphere-Framework=0.9&X-Atmosphere-Transport=websocket&X-Cache-Date=0&Accept=application%2Fjson'); // instance of ngWebsocket, handled by $websocket service

        $rootScope.ws.$on('$open', function () {
            console.log(sitemapName+' Websocket is open!');
        });

        $rootScope.ws.$on('widget', function (message) {
            console.log('widget' + message); // it prints 'parrot data'
        });

        $rootScope.ws.$on('$message', function (data) {
            console.log('$message The websocket server has sent the following data:');
            console.log(data);

            if (data.widget) {
                ModelService.setItem(data.widget.widgetId, data.widget);
                $scope.$apply(function () {
                    $scope.sitemapData = ModelService.getItem($scope.pageId);
                });

            }
        });

        $rootScope.ws.$on('$close', function () {
            console.log(sitemapName + 'Websocket closed!');
        });
    });

    $scope.$on('$ionicView.leave', function() {
        // Code you want executed every time view is opened
        console.log(sitemapName + ' exit!')
    });
});
