/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */

var sitemapServices = angular.module('SitemapServices', ['ngResource','ngStorage']);

sitemapServices.factory('Sitemaps', ['$resource','$localStorage',
    function ($resource,$localStorage) {

        return $resource($localStorage.url+'/rest/sitemaps', {}, {
            query: {method: 'JSONP', params: {type: 'jsonp', jsoncallback: 'JSON_CALLBACK' }, isArray: false}
        });
    }]);

sitemapServices.factory('Sitemap', ['$resource',
    function ($resource) {
        return function(url){
            return $resource(url, {}, {
                query: {method: 'JSONP', params: {type: 'jsonp', jsoncallback: 'JSON_CALLBACK' } ,isArray: false}
            });
        }

    }]);


sitemapServices.factory('StateCreator', [function() {

        var createState = function (stateName) {

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
