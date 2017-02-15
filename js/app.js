const app = angular.module('NetworkApp', ['ui.router']);

let joinNetwork = require('./controllers/joinNetwork');
let viewNetwork = require('./controllers/viewNetwork');
let charlotteMap = require('./controllers/charlotteMap');
const controllers = [
    joinNetwork,
    viewNetwork,
    charlotteMap,
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
    })
});


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
            
        }
    }
});

//leaflet stuff
// window.addEventListener('load', function () {
//  var mymap = L.map('mapid').setView([35.226944, -80.843333], 13);

//         L.tileLayer('https://api.mapbox.com/styles/v1/lclark070607/ciz2xr2gg002r2rqb9g2r41ut/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag', {
//             attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//             maxZoom: 18,
//             id: 'mapbox.streets',
//             accessToken: 'pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag'
//         }).addTo(mymap);

// })



