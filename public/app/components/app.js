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
            })
            .when("/login", {
                templateUrl: "views/landmanagement.html",
                controller: "LandManagementController"
            })
            .when("/land/:id", {
                templateUrl: "views/land.html",
                controller: "LandDetailController"
            })
            .when("/lands", {
                templateUrl: "views/lands.html",
                controller: "LandsController"
            })
            .otherwise({
                redirectTo: "/"
            });

        $translateProvider
            .translations('en_US', {
                'WELCOME_TO_OUR_PROJECT': "Welcome to our lands",
                'VISIT_OUR_LANDS': "Visit these lands s;as  basl  als ls da sd f;a f a;d  df s df a d f2w;;kjfa fs;dfks fajjas;klf adfj; ; as;dkfj asf; fasd",
                'LAND_LIST': "got to",
                'SPECIAL_OFFER': "Special offer",
                'THIS_IS_OUR_BEST_PLAN': "This land is our special offer a df;as sd f   d fadsfjj;k ksd fa; fj ;wj;lkf; fa sdf  h t   df  dfg sadf sdf asd f  w w23trey fgh df sdf dfg f ",
                'SEE_THIS_SPECIAL': "See this offer",
                'TITRE1_GALLERIE': "Important section",
                'TEXT_ALLO': "texte en angl",
                'BROWSE_GALLERY': "Browse gallery"
            })
            .translations('fr_CA', {
                'WELCOME_TO_OUR_PROJECT': "Bienvenue sur notre project de terrain",
                'VISIT_OUR_LANDS': "Visitez nos terrains, basl  als ls da sd f;a f a;d  df s df a d f2w;;kjfa fs;dfks fajjas;klf adfj; ; as;dkfj asf; fasd",
                'LAND_LIST': "Voir les terrains",
                'SPECIAL_OFFER': "Offre spéciale",
                'THIS_IS_OUR_BEST_PLAN': "Ce terrain est notre offre spéciale a df;as sd f   d fadsfjj;k ksd fa; fj ;wj;lkf; fa sdf  h t   df  dfg sadf sdf asd f  w w23trey fgh df sdf dfg f ",
                'SEE_THIS_SPECIAL': "Voir ce terrain",
                'TITRE1_GALLERIE': "Section importante",
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


client28App.controller('LandManagementController', ['$scope', 'LandsAsService', "ConnexionService", function ($scope, landsAsService, loggedState) {

    $scope.lands = landsAsService.lands;
    $scope.isLogged = loggedState.isLogged();

    $scope.setNewLoginState = function(){
        loggedState.setLoginStatus($scope.isLogged);
    }

    $scope.addRow = function () {
        $scope.id = findHighestId() + 1;
        $scope.lands.push({
            'id': $scope.id,
            'name': $scope.name,
            'size': $scope.size,
            'details': $scope.details,
            'other': $scope.other
        });
        resetFormField();
    };

    $scope.editRow = function (name) {
    }

    $scope.removeRow = function (name) {
        var index = -1;
        var comArr = eval($scope.lands);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.lands.splice(index, 1);
    };

    function resetFormField() {

        $scope.id = '';
        $scope.name = '';
        $scope.details = '';
        $scope.size = 0;
        $scope.other = '';

    }

    function findHighestId() {
        var found = 0;
        var log = [];
        angular.forEach($scope.lands, function (value, key) {
            console.log(key + "=" + value + "");
            if (value.id > found) found = value.id;

        }, log);
        console.log(log);
        return found;
    }


}]);


client28App.controller('LandsController', ['$scope', 'LandsAsService', "ConnexionService", function ($scope, landsAsService, loginStatus) {
    $scope.lands = landsAsService.fetchLands();
    $scope.loginState = loginStatus.isLogged();
}]);



client28App.controller('ContactController', ['$scope', function ($scope) {
}]);
client28App.controller('AboutController', ['$scope', function ($scope) {
}]);
client28App.controller('HomeController', ['$scope', function ($scope) {
}]);
client28App.controller('LandDetailController', ['$scope', 'LandsAsService', "$routeParams", function ($scope, landsAsService, routeParams) {
    console.log("Editing land: " + routeParams.id);
    $scope.land = landsAsService.fetchLand(routeParams.id);

    $scope.saveLand = function (id) {
        landsAsService.setLand(id, $scope.land);
    }
}]);

client28App.service('ConnexionService', function () {
    this.isLoggedIn = false;
    this.isLogged = function(){
        return this.isLoggedIn;
    }
    this.setLoginStatus = function( status ){
        this.isLoggedIn = status;
    }
});


client28App.service('LandsAsService', function () {
    var theselands;

    this.lands = [
        {
            'id': 1,
            'name': 'Infosys Technologies',
            'size': 125000,
            'details': 125000,
            'other': 'Bangalore'
        },
        {
            'id': 2,
            'name': 'Cognizant Technologies',
            'size': 125000,
            'details': 100000,
            'other': 'Bangalore'
        }
    ];
    theselands = this.lands;
    this.fetchLands = function(){
        return theselands;
    }
    this.fetchLand = function (id) {
        var found = {};
        for (var i = 0; i < theselands.length; i++) {
            if (theselands[i].id == id) {
                found = theselands[i];
                break;
            }
        }
        return found;
    }
    this.setLand = function (id, land) {
        // First, let's find it
        var found = 0;
        for (var i = 0; i < theselands.length; i++) {
            if (theselands[i].id == id) {
                found = i;
                break;
            }
        }
        theselands[found] = land;
    }

});


