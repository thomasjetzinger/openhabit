/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */

var sitemapServices = angular.module('SitemapServices', ['ngResource']);

sitemapServices.factory('Sitemaps', ['$resource',
    function ($resource) {
        return $resource('http://demo.openhab.org:8080/rest/sitemaps?type=jsonp&jsoncallback=JSON_CALLBACK', {}, {
            query: {method: 'JSONP', params: {sitemap: 'sitemap'}, isArray: false}
        });
    }]);

sitemapServices.factory('Sitemap', ['$resource',
    function ($resource) {
        return $resource('http://demo.openhab.org:8080/rest/sitemaps/demo', {}, {
            query: {method: 'JSONP', params: {type: 'jsonp', jsoncallback: 'JSON_CALLBACK' } ,isArray: false}
        });
    }]);


sitemapServices.factory('StateCreator', ["$state", "$rootScope", function($state, $rootScope) {

        var createState = function (parentStateName, stateName) {

            var state = {
                stateName: stateName,
                url: "/" + stateName.substring(stateName.lastIndexOf(".") + 1),
                resolve: {

                    sitemapName: function () {
                        return stateName;
                    },
                    sitemapContent: function (SiteMapContentService) {
                        console.log("resolve sitemapContent for " + stateName + "\n");
                        return SiteMapContentService.getItem(stateName);
                    }
                },
                views: {
                    'menuContent@app': {
                        templateUrl: "screens/main.html",
                        controller: 'gridListCtrl'
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
