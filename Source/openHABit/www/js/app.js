// Ionic openHabit App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'openHabit' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var $stateProviderRef = null;

var openHabitModule = angular.module('openHABit', ['ionic', 'ngMaterial', 'ngMdIcons', 'SitemapServices', 'SiteMapContentServiceModule'])


    .config(function ($mdGestureProvider) {
        $mdGestureProvider.skipClickHijack();
    })
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
        function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

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


            // store for use in loading controller

            console.log("save state provider reference");
            openHabitModule.stateProvider = $stateProvider;
            $stateProviderRef = $stateProvider;

            console.log("otherwise");

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
        });
    });