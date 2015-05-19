
openHabitModule.controller('gridListCtrl', function($scope, $state, sitemapContent, sitemapName, Item) {

    console.log("gridListCtrl " + sitemapName);
    console.log("gridListCtrl " + sitemapContent);
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

});
