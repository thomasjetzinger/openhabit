/**
 * Created by Jakob on 05.05.2015.
 */
var sitemapContentModule = angular.module('SiteMapContentServiceModule', [])
    .service('SiteMapContentService', function () {
        console.log("DataService init");

        var widgetCollection = [];

        return {

            reset: function() {
                widgetCollection = [];
            },

            addItem: function(state, widget) {
                //console.log("add widgets for state " + state);
                if(state in widgetCollection)
                    widgetCollection[state].push(widget);
                else
                    widgetCollection[state] = widget;
            },

            getItem: function (_id) {
                console.log("SiteMapContentService getItem called for id " + _id);
                //todo find better way

                if(_id in widgetCollection) {
                    return  {label: widgetCollection[_id].label, items: widgetCollection[_id], linkedState: _id};
                }
            }

        }
    });