/**
 * Created by Jakob on 05.05.2015.
 */
var sitemapContentModule = angular.module('SiteMapContentServiceModule', [])
    .service('SiteMapContentService', function () {
        console.log("DataService init");



        return {

            getItem: function (_id) {
                console.log("SiteMapContentService getItem called...");
                //todo find better way
                if (_id == 0){
                    var favourites = [
                        {
                            icon: "img/icons/openhab/light-off.png",
                            title: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "img/icons/openhab/groundfloor.png",
                            title: "Bathroom",
                            type: "group",
                            link: "app.bathroom",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "img/icons/openhab/contact.png",
                            title: "Contact ",
                            type: "contact",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: favourites,title: "Favourites"};
                }

                else if (_id == 1){
                    var test1 = [
                        {
                            icon: "img/icons/openhab/light-off.png",
                            title: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "img/icons/openhab/groundfloor.png",
                            title: "Second Floor",
                            type: "group",
                            link: "app.secondFloor",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "img/icons/openhab/contact.png",
                            title: "Contact ",
                            type: "contact",
                            link: "detail",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: test1,title: "First Floor"};
                }

                else if (_id == 2){
                    var test2 = [
                        {
                            icon: "img/icons/openhab/light-off.png",
                            title: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "img/icons/openhab/bath.png",
                            title: "Bathroom ",
                            type: "group",
                            link: "app.bathroom",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: test2,title: "First Floor"};
                }

                else{
                    var test3 = [
                        {
                            icon: "img/icons/openhab/light-off.png",
                            title: "Switch ",
                            type: "switch",
                            state: "true",
                            rowSpan: 1,
                            columnSpan: 1
                        },
                        {
                            icon: "img/icons/openhab/contact.png",
                            title: "Contact ",
                            type: "contact",
                            rowSpan: 1,
                            columnSpan: 1
                        }
                    ];
                    return {items: test3,title: "Bathroom"};

                }


            }

        }
    });