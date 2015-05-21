/**
 * Created by Thomas Jetzinger on 21/05/2015.
 */

angular.module('StateContentManager', []).factory('StateCreator', [function() {

    var createState = function (stateName, title) {

        var state = {
            stateName: stateName,
            url: "/" + stateName.substring(stateName.lastIndexOf(".") + 1),
            resolve: {

                sitemapName: function () {
                    return stateName;
                },
                pageTitle: function () {
                    return title;
                },
                sitemapContent: function (ModelService) {
                    console.log("resolve sitemapContent for " + stateName + "\n");
                    return ModelService.getItem(stateName);
                }
            },
            views: {
                'menuContent@app': {
                    templateUrl: "screens/main.html",
                    controller: 'mainController'
                }
            }
        };

        return state;
    };

    return {
        createState: createState
    }
}
]);