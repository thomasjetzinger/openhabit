// Ionic openHabit App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'openHabit' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var openHabitModule = angular.module('openHABit', ['ionic', 'ngMaterial', 'ngMdIcons', 'sitemapServices', 'SiteMapContentServiceModule'])


    .config(function ($mdGestureProvider) {
        $mdGestureProvider.skipClickHijack();
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);


        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "screens/menu.html"
        })

            .state('app.main', {
                url: "/main",
                resolve: {

                    sitemapContent: function (SiteMapContentService) {
                        console.log("resolve sitemapContent\n");
                        var data = [];
                        data.push(SiteMapContentService.getItem(0));
                        data.push(SiteMapContentService.getItem(1));
                        return data;
                    }
                    //,
                    //sitemapName: "Main"
                },
                views: {
                    'menuContent': {
                        templateUrl: "screens/main.html",
                        controller: 'gridListCtrl'
                    }
                }
            })

            .state('app.sitemap2', {
                url: "/sitemap2",
                resolve: {

                    sitemapContent: function (SiteMapContentService) {
                        console.log("resolve sitemapContent2\n");
                        return SiteMapContentService.getItem(2);
                    }
                    //,
                    //sitemapName: "Second Floor"
                },
                views: {
                    'menuContent': {
                        templateUrl: "screens/sitemap2.html",
                        controller: 'gridListCtrl'
                    }
                }

            })

            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "screens/settings.html"
                    }
                }
            })

            .state('app.about', {
                url: "/about",
                views: {
                    'menuContent': {
                        templateUrl: "screens/about.html"
                    }
                }
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/main');
    }).run(function ($ionicPlatform) {
        $ionicPlatform.ready(function ($rootScope) {
            console.log("ionic ready");
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            //$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            //    console.log("stateChangeError:");
            //    console.log(error);
            //});
            //
            //$rootScope.$on("$stateNotFound", function (event, unfoundState, fromState) {
            //    console.log("stateNotFound:");
            //    console.log(unfoundState);
            //    console.log(fromState);
            //});

        });
    });


