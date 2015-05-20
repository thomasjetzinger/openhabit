/**
 * Created by Jakob on 05.05.2015.
 */
openHabitModule.service('ModelService', function ($websocket,$rootScope) {
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

    var ws = $websocket.$new('ws://demo.openhab.org:8080/rest/sitemaps/demo/FF_Bath?X-Atmosphere-tracking-id=a5c1f99f-e88b-3266-cbce-f461bfbfe14d&X-Atmosphere-Framework=0.9&X-Atmosphere-Transport=websocket&X-Cache-Date=0&Accept=application%2Fjson'); // instance of ngWebsocket, handled by $websocket service

    ws.$on('$open', function () {
        console.log('Oh my gosh, websocket is really open! Fukken awesome!');

        ws.$emit('ping', 'hi listening websocket server'); // send a message to the websocket server

        var data = {
            level: 1,
            text: 'ngWebsocket rocks!',
            array: ['one', 'two', 'three'],
            nested: {
                level: 2,
                deeper: [{
                    hell: 'yeah'
                }, {
                    so: 'good'
                }]
            }
        };

        //ws.$emit('pong', data);
    });

    ws.$on('received', function (data) {
        console.log('The websocket server has sent the following data:');
        console.log(data);

        ws.$close();
    });

    ws.$on('$message', function(data) {
        console.log('The websocket server has sent the following data:');
        console.log(data);

        if(data.widget) {
            setItem(data.widget.widgetId, data.widget);
            $rootScope.$broadcast('sitemaps_content:updated', data.widget);

        }
    });

    ws.$on('$close', function () {
        console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
    });

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