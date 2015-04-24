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