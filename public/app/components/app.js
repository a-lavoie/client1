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

    landsAsService.getLands().then(function(data){
        $scope.lands = data;
        return data;
    });


    var loggedStateListener = $scope.$on("user:updated", function( event, args ){
        $scope.isLogged = loggedState.isLogged();
    });
    $scope.isLogged = loggedState.isLogged();
    $scope.$on('$destroy', loggedStateListener );

    $scope.setNewLoginState = function(){
        loggedState.setLoginStatus($scope.isLogged);
    }

    $scope.addRow = function () {
        $scope.id = findHighestId() + 1;
        var land = {
            'id': $scope.id,
            'name': $scope.name,
            'size': $scope.size,
            'details': $scope.details,
            'other': $scope.other
        };
        $scope.lands.push( land );
        landsAsService.addLand(land).then(function(data){
            $scope.lands[data.id] = data;
            return data;
        })
        resetFormField();
    };

    $scope.editRow = function (name) {}
    $scope.removeRow = function (id) {
        var comArr = eval($scope.lands);
        var index = -1;
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        landsAsService.removeLand(id).then(function(data){
            $scope.lands.splice(index, 1);
            return data;
        })
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


client28App.controller('LandsController', ['$scope', 'LandsAsService', "ConnexionService", "$rootScope", function ($scope, landsAsService, loginStatus, $rootScope) {

    landsAsService.getLands().then(function(data){
        $scope.lands = data;
        return data;
    });

    var loggedStateListener = $rootScope.$on("user:updated", function( event, args ){
        $scope.loginState = loginStatus.isLogged();
    });
    $scope.loginState = loginStatus.isLogged();
    $scope.$on('$destroy', loggedStateListener );
    $scope.predicate = 'id';

    var landsListener = $rootScope.$on("lands:updated", function(e, a){
        landsAsService.getLands().then(function(data){
            $scope.lands = data;
            return data;
        });
    });
    $scope.$on('$destroy', landsListener );

}]);



client28App.controller('ContactController', ['$scope', function ($scope) {
}]);
client28App.controller('AboutController', ['$scope', function ($scope) {
}]);
client28App.controller('HomeController', ['$scope', function ($scope) {
}]);
client28App.controller('LandDetailController', ['$scope', 'LandsAsService', "$routeParams", function ($scope, landsAsService, routeParams) {

    console.log("Editing land: " + routeParams.id);

    landsAsService.fetchLand(routeParams.id).then(function(data){
        $scope.land = data;
        return data;
    });

    $scope.saveLand = function (id) {
        landsAsService.saveLand(id, $scope.land)
        .then(function(data){
            $scope.land = data;
            return data;
        })
    }

}]);

client28App.service('ConnexionService', function ( $rootScope ) {
    this.isLoggedIn = false;
    this.isLogged = function(){
        return this.isLoggedIn;
    }
    this.setLoginStatus = function( status ){
        if ( this.isLoggedIn != status ){
            this.isLoggedIn = status;
            $rootScope.$emit("user:updated");
        }
    }
});


client28App.service('LandsAsService', [ "$http", "$rootScope", function ( $http, $rootScope ) {
    var lands = [];

    getLands().then(function(data){
        lands = data;
        return data;
    });

    function getLands(){
        return $http.get('/api/lands')
            .then(function(result, status, headers, config){
                return result.data;
            }, function(error){
                console.log(error);
                return error;
            });
    }

    function fetchLand(id) {

        return $http.get('/api/land/' + id)
            .then(function(result, status, headers, config){
                return result.data;
            }, function(error){
                console.log(error);
                return error;
            });
    }

    function saveLand(id, land) {

        return $http.post('/api/land/' + id, land)
            .then(function(result, status, headers, config){
                $rootScope.$emit("lands:updated");
                return result.data;
            }, function(error){
                console.log(error);
                return error;
            });

    }

    function addLand(land) {

        return $http.post('/api/land', land)
            .then(function(result, status, headers, config){
                $rootScope.$emit("lands:updated");
                return result.data;
            }, function(error){
                console.log(error);
                return error;
            });

    }

    function removeLand(landId) {

        return $http.delete('/api/land/' + landId, {})
            .then(function(result, status, headers, config){
                $rootScope.$emit("lands:updated");
                return result.data;
            }, function(error){
                console.log(error);
                return error;
            });

    }


    var service = {
        lands: lands,
        fetchLand: fetchLand,
        getLands: getLands,
        saveLand: saveLand,
        addLand: addLand,
        removeLand: removeLand
    };

    return service;

}]);


