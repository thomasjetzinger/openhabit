/**
 * Created by Thomas Jetzinger on 24/04/2015.
 */
openHabitModule.controller('SettingsCtrl', function($scope, $localStorage) {
    $scope.$storage = $localStorage;
    $scope.url = $localStorage.url;

    $scope.urlChanged = function () {

        if( $scope.url.substring(0,7)== "http://"){
            $localStorage.url =  $scope.url.substring(7, $scope.url.length);
            $localStorage.protocol = "http://"
        }else  if( $scope.url.substring(0,8)== "https://"){
            $localStorage.url =  $scope.url.substring(8, $scope.url.length);
            $localStorage.protocol = "https://"
        }else{
            $localStorage.url =   $scope.url;
            $localStorage.protocol = "http://"
        }

        if($localStorage.url.substring($localStorage.url.length-1,$localStorage.url.length) == "/"){
            $localStorage.url = $localStorage.url.substring(0,$localStorage.url.length-1);
        }


    };



});
