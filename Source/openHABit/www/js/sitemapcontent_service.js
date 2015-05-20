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
                        item.label = "Frame Label";
                        result = result.concat(flatternWidgets(item.widget));
                    }
                });
            }else{
                result.push(items);
                if(items.type == "Frame"){
                    items.label = "Frame Label";
                    result = result.concat(flatternWidgets(items.widget));
                }
            }


            return result;
        }

        function getSitemap(_id) {
            var sitemap = sitemaps.filter(function (obj) {
                if (_id.indexOf(obj.id) >= 0) {
                    return obj;
                }
            });

            if(angular.isArray(sitemap))
                return sitemap[0];
            else
                return sitemap;
        }

        /**
         * Gets the full id (e.g. app.demo.0000 from 0000)
         * @param _id
         */
        function getFullId(_id) {
            if(_id in currentSitemap.widgetCollection == false) {
                _id = currentSitemap.widgetCollection.filter(function (key) {
                    if (key.indexOf(_id) >= 0)
                        return _id;
                });
            }

            return _id;
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
                var result_sitemap = getSitemap(_id);

                if (result_sitemap) {

                    var flat_items = flatternWidgets(result_sitemap.widgetCollection[_id]);
                    if (_id in result_sitemap.widgetCollection) {
                        return {
                            label: result_sitemap.widgetCollection[_id].label,
                            items: flat_items,
                            linkedState: _id
                        };
                    }
                }
                else
                    console.error('no sitemap for id ' + _id);
            },

            setItem: function(_id, _widgets) {
                _id = getFullId(_id);
                currentSitemap.widgetCollection[_id] = _widgets;
            },

            setSitemaps: function (_sitemaps) {
                sitemaps = _sitemaps;

                //TODO remove this
                currentSitemap = sitemaps[0];
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