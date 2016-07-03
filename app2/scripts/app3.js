var myApp = angular.module('confusionApp', ['ngRoute'])
    .config(function ($routeProvider) {
        console.log('ok..');
        $routeProvider
            .when('/contactus', {
                templateUrl: 'contactus.html',
                controller: 'ContactController'
            })
            .when('/menu', {
                templateUrl: 'menu2.html',
                controller: 'MenuController'
            })
            .when('/menu/:id', {
                templateUrl: 'dishdetail.html',
                controller: 'dishDetailController'
            })
            .otherwise('/contactus');

    });