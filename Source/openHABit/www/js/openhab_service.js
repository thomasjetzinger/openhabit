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

sitemapServices.factory('Page', ['$resource', '$localStorage',
    function ($resource, $localStorage) {
        return function(page){
            //TODO make sitemap name dynamic
            return $resource($localStorage.url+'/rest/sitemaps/demo/' + page, {}, {
                query: {method: 'JSONP', params: {time: new Date().getMilliseconds(), type: 'jsonp', jsoncallback: 'JSON_CALLBACK' } ,isArray: false}
            });
        }
    }]);



sitemapServices.factory('Item', ['$resource',
    function ($resource) {
        return function (url) {
            return $resource(url + '/state',{}, {
                    update: {
                        method: 'PUT', params: {}, isArray: false,
                        headers: {
                            'Content-Type': 'text/plain; charset=UTF-8',
                            'Access-Control-Allow-Origin': ' *'/*,
                            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'*/
                        }
                    }
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
