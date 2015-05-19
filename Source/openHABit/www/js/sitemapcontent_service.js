/**
 * Created by Jakob on 05.05.2015.
 */
var sitemapContentModule = angular.module('SiteMapContentServiceModule', [])
    .service('SiteMapContentService', function () {
        console.log("DataService init");

        //var widgetCollection = [];
        var sitemaps = [];
        var currentSitemap;


        function flatternWidgets(items){

            var result = [];
            if(Array.isArray(items)){
                angular.forEach(items, function(item){
                    result.push(item);
                    if(item.type == "Frame"){
                        result = result.concat(flatternWidgets(item.widget));
                    }
                });
            }else{
                result.push(items);
                if(items.type == "Frame"){
                    result = result.concat(flatternWidgets(items.widget));
                }
            }


            return result;
        }



        return {

            //reset: function() {
            //    widgetCollection = [];
            //},
            //
            //addItem: function(state, widget) {
            //    //console.log("add widgets for state " + state);
            //    if(state in widgetCollection)
            //        widgetCollection[state].push(widget);
            //    else
            //        widgetCollection[state] = widget;
            //},
            //
            getItem: function (_id) {
                console.log("SiteMapContentService getItem called for id " + _id);
                var result_sitemap = sitemaps.filter(function (obj) {
                    if (_id.indexOf(obj.id) >= 0) {
                        return obj
                    }
                });

                var  flat_items = flatternWidgets(result_sitemap[0].widgetCollection[_id]);
                if (result_sitemap.length > 0 && _id in result_sitemap[0].widgetCollection) {
                    return {
                        label: result_sitemap[0].widgetCollection[_id].label,
                        items: flat_items,
                        linkedState: _id
                    };
                }
            },




            setSitemaps: function (_sitemaps) {
                sitemaps = _sitemaps;
            },

            getSitemaps: function () {
                return sitemaps;
            },

            setCurrentSitemap: function (_sitemap) {
                currentSitemap = _sitemap;
            },

            getCurrentSitemap: function () {
                return currentSitemap;
            }

        }
    });