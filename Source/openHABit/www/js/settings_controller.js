/**
 * Created by Thomas Jetzinger on 24/04/2015.
 */
openHabitModule.controller('SettingsCtrl', function($scope, $localStorage) {
        $scope.$storage = $localStorage;

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
