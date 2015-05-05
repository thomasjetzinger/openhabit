/**
 * Created by Thomas Jetzinger on 24/04/2015.
 */
controllerModule.controller('gridListCtrl', function($scope) {




    $scope.sitemapData = buildData();


    function buildData(){
        var data = [];

        var favourites=[
            {
                icon : "img/icons/openhab/light-off.png",
                title: "Switch ",
                type: "switch",
                state: "true",
                rowSpan: 1,
                columnSpan:1
            },
            {
                icon : "img/icons/openhab/groundfloor.png",
                title: "Group ",
                type: "group",
                link: "detail",
                rowSpan: 1,
                columnSpan:1
            },
            {
                icon : "img/icons/openhab/contact.png",
                title: "Contact ",
                type: "contact",
                link: "detail",
                rowSpan: 1,
                columnSpan:1
            }
        ];

       var test1=[
            {
                icon : "img/icons/openhab/light-off.png",
                title: "Switch ",
                type: "switch",
                state: "true",
                rowSpan: 1,
                columnSpan:1
            },
            {
                icon : "img/icons/openhab/groundfloor.png",
                title: "Group ",
                type: "group",
                link: "detail",
                rowSpan: 1,
                columnSpan:1
            },
            {
                icon : "img/icons/openhab/contact.png",
                title: "Contact ",
                type: "contact",
                link: "detail",
                rowSpan: 1,
                columnSpan:1
            }
        ];

       var test2=[
            {
                icon : "img/icons/openhab/light-off.png",
                title: "Switch ",
                type: "switch",
                state: "true",
                rowSpan: 1,
                columnSpan:1
            },
            {
                icon : "img/icons/openhab/groundfloor.png",
                title: "Group ",
                type: "group",
                link: "detail",
                rowSpan: 1,
                columnSpan:1
            },
            {
                icon : "img/icons/openhab/contact.png",
                title: "Contact ",
                type: "contact",
                items: test3,
                rowSpan: 1,
                columnSpan:1
            }
        ];

       var test3=[
            {
                icon : "img/icons/openhab/light-off.png",
                title: "Switch ",
                type: "switch",
                state: "true",
                rowSpan: 1,
                columnSpan:1
            },
            {
                icon : "img/icons/openhab/contact.png",
                title: "Contact ",
                type: "contact",
                link: "detail",
                rowSpan: 1,
                columnSpan:1
            }
        ];

        data.push({items: favourites,title: "Favourites"});
        data.push({items: test1,title: "First Floor"});
        data.push({items: test2,title: "Second Floor"});
        data.push({items: test2,title: "Third Floor"});
        return data;
    }





});
