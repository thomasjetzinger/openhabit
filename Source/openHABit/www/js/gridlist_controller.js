
openHabitModule.controller('gridListCtrl', function($scope, $state, sitemapContent, sitemapName) {

    console.log("gridListCtrl " + sitemapName);
    console.log("gridListCtrl " + sitemapContent);
    $scope.sitemapData = sitemapContent;
    $scope.sitemapName = sitemapName;

    $scope.navigateTo = function ( path ) {
        console.log("Navigate to " + path);
        $state.go(path);
    };

});
