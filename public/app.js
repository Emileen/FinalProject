(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            return $http.get('https://raw.githubusercontent.com/mecklenburg-gis/mecklenburg-gis-opendata/master/data/libraries.geojson').then(function (response) {
                return response.data;
            });
        },

        getHospitals() {
            return $http.get('https://raw.githubusercontent.com/mecklenburg-gis/mecklenburg-gis-opendata/master/data/hospitals.geojson').then(function (response) {
                return response.data;
            });
        },

        getParks() {
            return $http.get('https://raw.githubusercontent.com/mecklenburg-gis/mecklenburg-gis-opendata/master/data/parks.geojson').then(function(response) {
                return response.data;
            });
        },
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




},{"./controllers/charlotteMap":2,"./controllers/joinNetwork":3,"./controllers/viewNetwork":4}],2:[function(require,module,exports){
module.exports = {
    name: 'charlotteMap',
    func: function ($scope, charlotteMapService) {
        var mymap = L.map('mapid').setView([35.226944, -80.843333], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/lclark070607/ciz2xr2gg002r2rqb9g2r41ut/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            minZoom: 5,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag'
        }).addTo(mymap);





        charlotteMapService.getAgencies().then(function (agencies) {

            let agenciesArray = [];

            // let buildingIcon = L.icon({
            //     iconUrl: 'img/building-15.svg',
            //     iconSize: [24, 24],
            //     iconAnchor: [12, 22],
            //     popupAnchor: [0, -24],
            // });
            var redMarker = L.AwesomeMarkers.icon({
                icon: 'coffee',
                markerColor: 'red'
            });


            for (let i = 0; i < agencies.length; i++) {
                agenciesArray = new L.marker([agencies[i].latitude, agencies[i].longitude], { icon: redMarker }).addTo(mymap);

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<h3>' + agencies[i].name + '</h3><br>' + agencies[i].address + '<br>' + agencies[i].phoneNumber);

                agenciesArray.bindPopup(popup);
            };
        });


        charlotteMapService.getHealthClinics().then(function (healthClinics) {
            let healthClinicsArray = [];

            let healthIcon = L.icon({
                iconUrl: 'img/building-15.svg',
                iconSize: [24, 24],
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < healthClinics.length; i++) {
                healthClinicsArray = new L.marker([healthClinics[i].latitude, healthClinics[i].longitude], { icon: healthIcon }).addTo(mymap);

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<h3>' + healthClinics[i].name + '</h3><br>' + healthClinics[i].address + '<br>' + healthClinics[i].contactNumber);

                healthClinicsArray.bindPopup(popup);
            };

        });

        charlotteMapService.getCisSchools().then(function (cisSchools) {

            let cisSchoolsArray = [];

            let schoolIcon = L.icon({
                iconUrl: 'img/building-15.svg',
                iconSize: [24, 24],
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < cisSchools.length; i++) {
                cisSchoolsArray = new L.marker([cisSchools[i].latitude, cisSchools[i].longitude], { icon: schoolIcon }).addTo(mymap);

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<h3>' + cisSchools[i].name + '</h3><br>' + cisSchools[i].address + '<br>' + cisSchools[i].contactNumber);

                cisSchoolsArray.bindPopup(popup);

            };

        });

        charlotteMapService.getLanguageImmersionSchools().then(function (languageImmersionSchools) {

            let languageImmersionSchoolsArray = [];
            let schoolIcon = L.icon({
                iconUrl: 'img/building-15.svg',
                iconSize: [24, 24],
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < languageImmersionSchools.length; i++) {
                languageImmersionSchoolsArray = new L.marker([languageImmersionSchools[i].latitude, languageImmersionSchools[i].longitude], { icon: schoolIcon }).addTo(mymap);

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<h3>' + languageImmersionSchools[i].name + '</h3><br>' + languageImmersionSchools[i].address + '<br>' + languageImmersionSchools[i].phoneNumber);

                languageImmersionSchoolsArray.bindPopup(popup);

            }

        });


        // charlotteMapService.getLibraries().then(function (libraries) {

        //     let librariesIcon = L.icon({
        //         iconUrl: 'img/building-15.svg',
        //         iconSize: [24, 24],
        //         iconAnchor: [12, 22],
        //         popupAnchor: [0, -24],
        //     });

        //     for (let i = 0; i < libraries.features.length; i++) {

        //         L.marker([libraries.features[i].geometry.coordinates[0], libraries.features[i].geometry.coordinates[1]], { icon: librariesIcon }).addTo(mymap);
        //     }

        // });

        // charlotteMapService.getHospitals().then(function (hospitals) {

        //     let hospitalsIcon = L.icon({
        //         iconUrl: 'img/building-15.svg',
        //         iconSize: [24, 24],
        //         iconAnchor: [12, 22],
        //         popupAnchor: [0, -24],
        //     });

        //     for (let i = 0; i < hospitals.features.length; i++) {

        //         L.marker([hospitals.features[i].geometry.coordinates[0], hospitals.features[i].geometry.coordinates[1]], { icon: hospitalsIcon }).addTo(mymap);
        //     }

        // });

        // charlotteMapService.getParks().then(function (parks) {

        //     let parksIcon = L.icon({
        //         iconUrl: 'img/building-15.svg',
        //         iconSize: [24, 24],
        //         iconAnchor: [12, 22],
        //         popupAnchor: [0, -24],
        //     });

        //     for (let i = 0; i < parks.features.length; i++) {

        //         L.marker([parks.features[i].geometry.coordinates[0], parks.features[i].geometry.coordinates[1]], { icon: parksIcon }).addTo(mymap);
        //     }

        // });


    }

}





//             let popup = L.popup({
//                 minWidth: 400

//             }).setContent({{$scope.name }} {{$scope.address }} {{ $scope.phoneNumber } });

// agencies[i].bindPopup(popup);
//         });








},{}],3:[function(require,module,exports){
module.exports = {
    name: 'joinNetwork',
    func: function ($scope, regFormService) {
        $scope.registration = {
           name: '',
           address: '',
           phoneNumber: '',
           contactPerson: '',
           email: '',
           website: '',   
        };

        $scope.submitRegistration = function() {
            regFormService.add($scope.registration)
        }
       
    },
};
},{}],4:[function(require,module,exports){
module.exports = {
    name: 'viewNetwork',
    func: function ($scope, regFormService) {

        $scope.forms = regFormService.getAll();
    }
};





},{}]},{},[1]);
