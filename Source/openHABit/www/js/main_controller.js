
openHabitModule.controller('gridListCtrl', function($scope, $state, sitemapContent, sitemapName, Item, Page, SiteMapContentService) {

    console.log("gridListCtrl " + sitemapName);
    console.log("gridListCtrl " + sitemapContent);

    var page = Page(sitemapName.substr(sitemapName.lastIndexOf(".") + 1)).query();


    page.$promise.then(function (page) {
        SiteMapContentService.setItem(page.id, page.widget);
        $scope.sitemapData = SiteMapContentService.getItem(page.id);
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
        Item(itemObj.item.link).update(itemObj.state ? "OFF" : "ON"); // only for testing
    };

    /*$rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            console.log("from " + fromState + " to " + toState);

            //var page = SiteMapContentService.getItem(toState.name);

            var page = Page(toState.name.substr(toState.name.lastIndexOf(".") + 1)).query();

            page.$promise.then(function (page) {
                SiteMapContentService.setItem('app.' + page.id, page.widget);
            });

        });
*/
});
