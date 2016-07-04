var myApp = angular.module('confusionApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        template: '<h2>To be completed</h2>',
                        controller: 'IndexController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }
            })
            .state('app.aboutus', {
                url: 'aboutus',
                views: {
                    'content@': {
                        template: '<h2>To be completed</h2>',
                        controller: 'AboutController'
                    }
                }
            })
            .state('app.contactus', {
                url: 'contactus',
                views: {
                    'content@': {
                        templateUrl: 'views/contactus.html',
                        controller: 'ContactController'
                    }
                }
            })
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl: 'views/menu2.html',
                        controller: 'MenuController'
                    }
                }
            })
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/dishdetail.html',
                        controller: 'dishDetailController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    });


