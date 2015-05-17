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
                else if (_id == 0){
                    var favourites = [
                        {
                            icon: "light-off",
                            label: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "groundfloor",
                            label: "Bathroom",
                            type: "Group",
                            linkedState: "app.bathroom",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "contact",
                            label: "Contact ",
                            type: "contact",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: favourites,label: "Favourites"};
                }

                else if (_id == 1){
                    var test1 = [
                        {
                            icon: "light-off",
                            label: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "groundfloor",
                            label: "Second Floor",
                            type: "Group",
                            linkedState: "app.secondFloor",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "contact",
                            label: "Contact ",
                            type: "contact",
                            linkedState: "detail",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: test1,label: "First Floor"};
                }

                else if (_id == 2){
                    var test2 = [
                        {
                            icon: "light-off",
                            label: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "bath",
                            label: "Bathroom ",
                            type: "Group",
                            linkedState: "app.bathroom",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: test2,label: "Second Floor"};
                }

                else{
                    var test3 = [
                        {
                            icon: "light-off",
                            label: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "contact",
                            label: "Contact ",
                            type: "contact",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: test3,label: "Bathroom"};

                }


            }

        }
    });