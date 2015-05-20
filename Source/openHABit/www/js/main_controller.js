
openHabitModule.controller('mainController', function($scope, $state, sitemapContent, sitemapName, Item, Page, ModelService) {

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


});
