const app = angular.module('NetworkApp', ['ui.router']);

let joinNetwork = require('./controllers/joinNetwork');
let viewNetwork = require('./controllers/viewNetwork');
let charlotteMap = require('./controllers/charlotteMap');
let viewHealthClinics = require('./controllers/viewHealthClinics');

const controllers = [
    joinNetwork,
    viewNetwork,
    charlotteMap,
    viewHealthClinics,
];

for (let i = 0; i < controllers.length; i++) {
    app.controller(controllers[i].name, controllers[i].func);
}

//VIEWS
app.config(function ($stateProvider) {
    // $stateProvider is the object we add routes ('states') to.
    $stateProvider.state({
        name: 'join-network',
        url: '/joinNetwork',
        component: 'joinNetwork',
    });

    $stateProvider.state({
        name: 'view-network',
        url: '/viewNetwork',
        component: 'viewNetwork',
    });

    $stateProvider.state({
        name: 'charlotte-map',
        url: '/charlotteMap',
        component: 'charlotteMap',
    });

    $stateProvider.state({
        name: 'view-health',
        url: '/viewHealthClinics',
        component: 'viewHealthClinics',
    });

})

 /* Defining a component */
    app.component('joinNetwork', {
        controller: 'joinNetwork',
        templateUrl: 'templates/joinNetwork.html',
    });

    app.component('viewNetwork', {
        controller: 'viewNetwork',
        templateUrl: 'templates/viewNetwork.html',
    });

    app.component('charlotteMap', {
        controller: 'charlotteMap',
        templateUrl: 'templates/charlotteMap.html',
    });

    app.component('viewHealth', {
        controller: 'viewHealthClinics',
        templateUrl: 'templates/viewHealthClinics.html',
    });

       /* Services */
    app.factory('regFormService', function ($http) {
        let forms = [];

        return {

            add(registration) {
                $http.post('https://stormy-badlands-83991.herokuapp.com/registration', {
                    name: registration.name,
                    address: registration.address,
                    phoneNumber: registration.phoneNumber,
                    email: registration.email,
                    contactPerson: registration.contactPerson,
                    website: registration.website,
                });
                console.log(registration);
            },

            getAll() {
                $http.get('https://stormy-badlands-83991.herokuapp.com/').then(function (response) {
                    angular.copy(response.data, forms);
                });

                return forms;
            },

        };

    })

    app.factory('charlotteMapService', function ($http) {
        let agencies = [];
        let healthClinics = [];
        let cisSchools = [];
        let libraries = [];
        let hospitals = [];
        let parks = [];

        return {
            getAgencies() {
                return $http.get('https://stormy-badlands-83991.herokuapp.com/').then(function (response) {
                    // angular.copy(response.data, agencies);
                    return response.data;
                });

                // return agencies;
            },

            getHealthClinics() {
                return $http.get('https://stormy-badlands-83991.herokuapp.com/resource/health/').then(function (response) {
                    // angular.copy(response.data, healthClinics);
                    return response.data;
                });

            },

            getCisSchools() {
                return $http.get('https://stormy-badlands-83991.herokuapp.com/resource/communitiesinschools/').then(function (response) {
                    // angular.copy(response.data, healthClinics);
                    return response.data;
                });

            },

            getLanguageImmersionSchools() {
                return $http.get('https://stormy-badlands-83991.herokuapp.com/resource/languageimmersion/').then(function (response) {
                    // angular.copy(response.data, healthClinics);
                    return response.data;
                });

            },

            getLibraries() {
                return $http.get('https://stormy-badlands-83991.herokuapp.com/resource/libraries/').then(function (response) {
                    // angular.copy(response.data, healthClinics);
                    return response.data;
                });

            },

            // getLibraries() {
            //     return $http.get('https://raw.githubusercontent.com/mecklenburg-gis/mecklenburg-gis-opendata/master/data/libraries.geojson').then(function (response) {
            //         return response.data;
            //     });
            // },

            // getHospitals() {
            //     return $http.get('https://raw.githubusercontent.com/mecklenburg-gis/mecklenburg-gis-opendata/master/data/hospitals.geojson').then(function (response) {
            //         return response.data;
            //     });
            // },

            // getParks() {
            //     return $http.get('https://raw.githubusercontent.com/mecklenburg-gis/mecklenburg-gis-opendata/master/data/parks.geojson').then(function (response) {
            //         return response.data;
            //     });
            // },
        }
    });
