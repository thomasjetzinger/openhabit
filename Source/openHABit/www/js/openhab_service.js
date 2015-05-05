/**
 * Created by Thomas Jetzinger on 04/05/2015.
 */

var sitemapServices = angular.module('sitemapServices', ['ngResource']);

sitemapServices.factory('Sitemaps', ['$resource',
    function($resource){
        return $resource('http://demo.openhab.org:8080/rest/sitemaps?type=jsonp&jsoncallback=JSON_CALLBACK', {}, {
            query: {method:'JSONP', params:{sitemap:'sitemap'}, isArray:false}
        });
    }]);