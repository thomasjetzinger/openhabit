// Ionic openHabit App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'openHabit' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var openHabitModule = angular.module('openHABit', ['ionic', 'ngMaterial', 'ngMdIcons', 'SitemapServices', 'SiteMapContentServiceModule'])


    .config(function ($mdGestureProvider) {
        $mdGestureProvider.skipClickHijack();
    })
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
        function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

        // store for use in loading controller
        openHabitModule.stateProvider = $stateProvider;

        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "screens/menu.html"
        })
           .state('app.loading', {
                url: "/loading",
                resolve: {
                    sitemapName:  function () {
                        return "Main"
                    }

                },
                views: {
                    'menuContent': {
                        templateUrl: "screens/loading.html",
                        controller: 'LoadingController'
                    }
                }
            })

            .state('app.main', {
                url: "/main",
                resolve: {

                    sitemapName:  function () {return "Main"},
                    sitemapContent: function (SiteMapContentService) {
                        console.log("resolve sitemapContent for main state\n");
                        var data = [];
                        data.push(SiteMapContentService.getItem('app.demo.demo_0'));
                        return data;
                    }


                },
                views: {
                    'menuContent': {
                        templateUrl: "screens/main.html",
                        controller: 'gridListCtrl'
                    }
                }
            })

            .state('app.secondFloor', {
                url: "/main",
                resolve: {

                    sitemapName:  function () {return "Second Floor"},
                    sitemapContent: function (SiteMapContentService) {
                        console.log("resolve secondFloor\n");
                        return [SiteMapContentService.getItem(2)];
                    }

                },
                views: {
                    'menuContent': {
                        templateUrl: "screens/main.html",
                        controller: 'gridListCtrl'
                    }
                }

            })

            .state('app.bathroom', {
                url: "/main",
                resolve: {

                    sitemapName:  function () {return "Bathroom"},
                    sitemapContent: function (SiteMapContentService) {
                        console.log("resolve bathroom\n");
                        return [SiteMapContentService.getItem(3)];
                    }

                },
                views: {
                    'menuContent': {
                        templateUrl: "screens/main.html",
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
        $urlRouterProvider.otherwise('/app/loading');
    }]).run(function ($ionicPlatform) {
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

var states = [
    { name: 'app.bedroom',
        url: "/main",
        resolve: {

            sitemapName:  function () {return "Bedroom"},
            sitemapContent: function (SiteMapContentService) {
                console.log("resolve sitemapContent or bedroom\n");
                var data = [];
                data.push(SiteMapContentService.getItem(0));
                return data;
            }


        },
        views: {
            'menuContent': {
                templateUrl: "screens/main.html",
                controller: 'gridListCtrl'
            }
        }
    }];
