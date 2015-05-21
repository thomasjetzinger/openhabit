/**
 * Created by Jakob on 05.05.2015.
 */
openHabitModule.service('ModelService', function () {
        console.log("DataService init");

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

        function getSitemap(_id) {
            var sitemap = angular.forEach(sitemaps,function(sitemap) {
                if (_id.indexOf(sitemap.id) >= 0) {
                    return sitemap;
                }
            });

           if(angular.isArray(sitemap))
                return sitemap[0];
            else
                return sitemap;
        }

    function setItem(_id,_widgets){
        _id = getFullId(_id);

        if(angular.isArray(_id)) {
            // the given id was an id of a widget
            var stateName = _id[0];
            var widgetId = _id[1];
            //todo currentSitemap is dangerous here, because it could change while loading
            for (var i = 0; i < currentSitemap.widgetCollection[stateName].length; i++) {
                if (currentSitemap.widgetCollection[stateName][i].widgetId == widgetId) {
                    currentSitemap.widgetCollection[stateName][i] = _widgets;
                    console.log(_widgets.item.state);
                    break;
                }
            }
        } else {
            currentSitemap.widgetCollection[_id] = _widgets;
        }
    }



        /**
         * Gets the full id (e.g. app.demo.0000 from 0000)
         * @param _id state name widgetId
         */
        function getFullId(_id) {
            if(_id in currentSitemap.widgetCollection == false) {

                for(var stateName in currentSitemap.widgetCollection) {

                    if (stateName.indexOf(_id) >= 0) {
                        return stateName;
                    }

                    // iterate through widgets
                    var groupName = stateName.substr(stateName.lastIndexOf(".") + 1);

                    if(_id.indexOf(groupName) == 0) {
                       return [stateName, _id];
                    }
                }
            }

            return _id;
         }


        return {


            getItem: function (_id) {
                _id = getFullId(_id);

                console.log("ModelService getItem called for id " + _id);

                if(angular.isArray(_id))
                    _id = _id[0]; // _id was name of a widget


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
                setItem(_id,_widgets);
            },

            setSitemaps: function (_sitemaps) {
                sitemaps = _sitemaps;

            },

            getSitemaps: function () {
                return sitemaps;
            },

            setCurrentSitemap: function (_sitemapId) {
                console.log("current sitemap set to: " + _sitemapId);
                currentSitemap = sitemaps.filter(function (_sitemap){
                    if(_sitemap.id == 'app.'+_sitemapId) {
                        return _sitemap;
                    }
                })[0];
            },

            getCurrentSitemap: function () {
                return currentSitemap;
            },

            //returns sitemap id without app.
            getCurrentSitemapId: function () {
                return currentSitemap.id.substring(4,currentSitemap.id.length);
            }
        }
    });