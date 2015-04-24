angular.module('openHabit.controllers', []) // register controller
    .controller('SubheaderAppCtrl', function($scope) {
        $scope.messages = [
            {
                face : 'img/icons/temperature.png',
                name: 'Temperature',
                value: '20 °C'
            },
            {
                face : 'img/icons/slider.png',
                name: 'Light',
                value: 'On'
            },
            {
                face : 'img/icons/heating.png',
                name: 'Heating',
                value: 'Off'
            }
        ];
    });

angular.module('openHABit.controllers', []) // register controller

    .controller('SettingsCtrl', function($scope) {
        $scope.color = {
            red: Math.floor(Math.random() * 255),
            green: Math.floor(Math.random() * 255),
            blue: Math.floor(Math.random() * 255)
        };
        $scope.rating1 = 3;
        $scope.rating2 = 2;
        $scope.rating3 = 4;
        $scope.disabled1 = 0;
        $scope.disabled2 = 70;
    });


    //.controller('AppCtrl1', function($scope, $ionicModal, $ionicPopover, $timeout) {
    //    // Form data for the login modal
    //    $scope.loginData = {};
    //    $scope.isExpanded = false;
    //    $scope.hasHeaderFabLeft = false;
    //    $scope.hasHeaderFabRight = false;
    //
    //    var navIcons = document.getElementsByClassName('ion-navicon');
    //    for (var i = 0; i < navIcons.length; i++) {
    //        navIcons.addEventListener('click', function() {
    //            this.classList.toggle('active');
    //        });
    //    }
    //
    //    ////////////////////////////////////////
    //    // Layout Methods
    //    ////////////////////////////////////////
    //
    //    $scope.hideNavBar = function() {
    //        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    //    };
    //
    //    $scope.showNavBar = function() {
    //        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    //    };
    //
    //    $scope.noHeader = function() {
    //        var content = document.getElementsByTagName('ion-content');
    //        for (var i = 0; i < content.length; i++) {
    //            if (content[i].classList.contains('has-header')) {
    //                content[i].classList.toggle('has-header');
    //            }
    //        }
    //    };
    //
    //    $scope.setExpanded = function(bool) {
    //        $scope.isExpanded = bool;
    //    };
    //
    //    $scope.setHeaderFab = function(location) {
    //        var hasHeaderFabLeft = false;
    //        var hasHeaderFabRight = false;
    //
    //        switch (location) {
    //            case 'left':
    //                hasHeaderFabLeft = true;
    //                break;
    //            case 'right':
    //                hasHeaderFabRight = true;
    //                break;
    //        }
    //
    //        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
    //        $scope.hasHeaderFabRight = hasHeaderFabRight;
    //    };
    //
    //    $scope.hasHeader = function() {
    //        var content = document.getElementsByTagName('ion-content');
    //        for (var i = 0; i < content.length; i++) {
    //            if (!content[i].classList.contains('has-header')) {
    //                content[i].classList.toggle('has-header');
    //            }
    //        }
    //
    //    };
    //
    //    $scope.hideHeader = function() {
    //        $scope.hideNavBar();
    //        $scope.noHeader();
    //    };
    //
    //    $scope.showHeader = function() {
    //        $scope.showNavBar();
    //        $scope.hasHeader();
    //    };
    //
    //    $scope.clearFabs = function() {
    //        var fabs = document.getElementsByClassName('button-fab');
    //        if (fabs.length && fabs.length > 1) {
    //            fabs[0].remove();
    //        }
    //    };
    //})
