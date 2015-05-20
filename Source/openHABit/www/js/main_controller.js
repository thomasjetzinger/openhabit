
openHabitModule.controller('mainController', function($scope, $state, sitemapContent, sitemapName, Item, Page, ModelService) {

    $scope.pageId = sitemapName.substr(sitemapName.lastIndexOf(".") + 1);
    var page = Page($scope.pageId).query();

    page.$promise.then(function (page) {
        ModelService.setItem(page.id, page.widget);
        $scope.sitemapData = ModelService.getItem($scope.pageId);
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


    $scope.$on('sitemaps_content:updated', function(event,data) {
        $scope.$apply(function () {


        $scope.sitemapData = ModelService.getItem($scope.pageId);


        });
    });


});
