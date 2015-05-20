
openHabitModule.controller('mainController', function($scope, $state, sitemapContent, sitemapName, Item, Page, ModelService, $websocket) {

    var page = Page(sitemapName.substr(sitemapName.lastIndexOf(".") + 1)).query();

    page.$promise.then(function (page) {
        ModelService.setItem(page.id, page.widget);
        $scope.sitemapData = ModelService.getItem(page.id);
    });

    $scope.sitemapData = sitemapContent;
    $scope.sitemapName = sitemapName;

    $scope.navigateTo = function ( path ) {
        console.log("Navigate to " + path);
        $state.go(path);
    };

    $scope.onSwitchChange = function( item ) {
        console.log(item + " change");
        itemObj = JSON.parse(item);
        Item(itemObj.item.link).update(itemObj.item.state == "ON" ? "OFF" : "ON"); // only for testing
    };


    var ws = $websocket.$new('ws://demo.openhab.org:8080/rest/sitemaps/demo/FF_Bath?X-Atmosphere-tracking-id=a5c1f99f-e88b-3266-cbce-f461bfbfe14d&X-Atmosphere-Framework=0.9&X-Atmosphere-Transport=websocket&X-Cache-Date=0&Accept=application%2Fjson'); // instance of ngWebsocket, handled by $websocket service

    ws.$on('$open', function () {
        console.log('Oh my gosh, websocket is really open! Fukken awesome!');

       ws.$emit('ping', 'hi listening websocket server'); // send a message to the websocket server

        var data = {
            level: 1,
            text: 'ngWebsocket rocks!',
            array: ['one', 'two', 'three'],
            nested: {
                level: 2,
                deeper: [{
                    hell: 'yeah'
                }, {
                    so: 'good'
                }]
            }
        };

        //ws.$emit('pong', data);
    });

    ws.$on('received', function (data) {
        console.log('The websocket server has sent the following data:');
        console.log(data);

        ws.$close();
    });

    ws.$on('$message', function(data) {
        console.log('The websocket server has sent the following data:');
        console.log(data);

        if(data.widget) {
            ModelService.setItem(data.widget.widgetId, data.widget);
            $scope.sitemapData = ModelService.getItem(data.widget.widgetId);
        }
    });

    ws.$on('$close', function () {
        console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
    });


});
