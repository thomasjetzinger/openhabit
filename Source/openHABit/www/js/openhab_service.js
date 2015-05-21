/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */

var openHabService = angular.module('OpenHabService', ['ngResource','ngStorage']);

openHabService.factory('Sitemaps', ['$resource','$localStorage',
    function ($resource,$localStorage) {

        return $resource($localStorage.protocol+$localStorage.url+'/rest/sitemaps', {}, {
            query: {
                url:$localStorage.protocol+$localStorage.url+'/rest/sitemaps',
                method: 'JSONP',
                params: {type: 'jsonp', jsoncallback: 'JSON_CALLBACK' },
                isArray: false
            }
        });
    }]);

openHabService.factory('Sitemap', ['$resource',
    function ($resource) {
        return function(url){
            return $resource(url, {}, {
                query: {method: 'JSONP', params: {type: 'jsonp', jsoncallback: 'JSON_CALLBACK' } ,isArray: false}
            });
        }

    }]);

openHabService.factory('Page', ['$resource', '$localStorage','ModelService',
    function ($resource, $localStorage, ModelService) {
        return function(page){
            return $resource($localStorage.protocol+$localStorage.url+'/rest/sitemaps/'+ModelService.getCurrentSitemapId()+'/' + page, {}, {
                query: {method: 'JSONP', params: {time: new Date().getMilliseconds(), type: 'jsonp', jsoncallback: 'JSON_CALLBACK' } ,isArray: false}
            });
        }
    }]);



openHabService.factory('Item', ['$resource',
    function ($resource) {
        return function (url) {
            return $resource(url ,{}, {
                    update: {
                        method: 'POST', params: {}, isArray: false,
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



