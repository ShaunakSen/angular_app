var myApp = angular.module('confusionApp', [])
    .controller('MenuController', ['$scope','menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = true;

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails
        };
        $scope.dishes = menuFactory.getDishes();

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = 'appetizer';
            }
            else if (setTab === 3) {
                $scope.filtText = 'mains';
            }
            else if (setTab === 4) {
                $scope.filtText = 'dessert';
            }
            else {
                $scope.filtText = '';
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

    }])
.controller('dishDetailController',['$scope','menuFactory', function($scope,menuFactory) {
    $scope.search = '';

    var dish=menuFactory.getDish(3);

    function inArray(array, item){
        for(var i=0; i<array.length; ++i){
            if(array[i] === item){
                return true;
            }
        }
        return false;
    }

    $scope.dish = dish;
    $scope.order = function(param){
        orderString = '';
        var acceptable2 = ['-rating','-date','-author','-comment'];
        var acceptable = ['rating','date','author','comment'];
        if(param.charAt(0) === '-'){
            if(inArray(acceptable2, param)){
                return param;
            }
            else{
                return '';
            }
        }
        else{
            if(inArray(acceptable, param)){
                return param;
            }
            else{
                return '';
            }
        }
    }
}]);