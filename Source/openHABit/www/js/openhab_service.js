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


sitemapServices.factory('StateCreator', [
    function () {

        var createState = function (parentStateName, stateName) {
            var state = {
                name: stateName,
                url: "/main",
                resolve: {

                    sitemapName: function () {
                        return "Bedroom"
                    },
                    sitemapContent: function (SiteMapContentService) {
                        console.log("resolve sitemapContent for " + name + "\n");
                        var data = [];
                        data.push(SiteMapContentService.getItem(name));
                        return data;
                    }


                },
                views: {
                    'menuContent': {
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
