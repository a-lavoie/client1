// Module

// Language support: Use
// https://github.com/angular-translate/angular-translate/blob/master/demo/ex1_basic_usage.htm

var client28App = angular.module("client28App", ['ngRoute', 'ngResource', 'pascalprecht.translate'])
    .config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {

        $routeProvider

            .when("/home", {
                templateUrl: "views/home.html",
                controller: 'HomeController'
            })
            .when("/", {
                templateUrl: "views/home.html",
                controller: 'HomeController'
            })
            .when("/about", {
                templateUrl: "views/about.html",
                controller: "AboutController"
            })
            .when("/contact", {
                templateUrl: "views/contact.html",
                controller: "ContactController"
            });

        $translateProvider
            .translations('en_US', {
                'TITRE1_GALLERIE':"Important section",
                'TEXT_ALLO':      "texte en angl",
                'BROWSE_GALLERY': "Browse gallery"
            })
            .translations('fr_CA', {
                'TITRE1_GALLERIE':"Section importante",
                'TEXT_ALLO': "Texte en francais",
                'BROWSE_GALLERY': "Voir la gallerie"
            });

        $translateProvider
            .preferredLanguage('en_US')
            .fallbackLanguage('fr_CA');


    }]);


client28App.controller('I18nController', ['$scope', "$translate", function ($scope, $translate) {

    // Integrate angular-translate instead of this.

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    }

}]);


client28App.controller('ContactController', ['$scope', function ($scope) {
}]);
client28App.controller('AboutController', ['$scope', function ($scope) {
}]);
client28App.controller('HomeController', ['$scope', function ($scope) {
}]);