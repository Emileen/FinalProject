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

app.factory('charlotteMapService', function ($scope, $http) {
    let agencies = [];
    let healthClinics = [];

    return {
        getAgencies() {
            $http.get('https://stormy-badlands-83991.herokuapp.com/').then(function (response) {
                angular.copy(response.data, agencies);
            });

            return agencies;
        },
       
        getHealthClinics() {
            $http.get('https://stormy-badlands-83991.herokuapp.com/health/').then(function (response) {
                angular.copy(response.data, healthClinics);
            });
            
            return healthClinics;
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




},{"./controllers/charlotteMap":2,"./controllers/joinNetwork":3,"./controllers/viewNetwork":4}],2:[function(require,module,exports){
module.exports = {
    name: 'charlotteMap',
    func: function ($scope) {
        var mymap = L.map('mapid').setView([35.226944, -80.843333], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/lclark070607/ciz2xr2gg002r2rqb9g2r41ut/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            minZoom: 10,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag'
        }).addTo(mymap);

        let agencies = [
            [35.215984, -80.78412809999998],
            [35.1918139, -80.77737780000001],
            [35.2206685, -80.85425939999999],
            [35.2150009, -80.82781219999998],
            [35.2206891, -80.80900270000001],
            [35.2298984, -80.75039370000002],
            [35.164301, -80.90953999999999],
            [35.1767738, -80.88124929999998],
        ];

        let buildingIcon = L.icon({
            iconUrl: 'img/building-15.svg',
            iconSize: [24, 24],
            iconAnchor: [12, 22],
            popupAnchor: [0, -24],
        });

        let markersArray = [];
        for (let i = 0; i < agencies.length; i++) {
            markersArray[i] = new L.marker(agencies[i], {icon: buildingIcon}).addTo(mymap);
        };

        let popup = L.popup ({
            minWidth: 400

        }).setContent('<img src="img/crra.png"><h3>Carolina Refugee Resettlement Agency</h3>');

        markersArray[0].bindPopup(popup);

    }
};

//building layers


//         let ourBridge = L.marker([35.215984, -80.78412809999998]).bindPopup('Our Bridge'),
//             crra = L.marker([35.1918139, -80.77737780000001]).bindPopup('Carolina Refugee Resettlement Agency'),
//             catholic = L.marker([35.2206685, -80.85425939999999]).bindPopup('Catholic Charities'),

//             international = L.marker([35.2206891, -80.80900270000001]).bindPopup('International House'),
//             muslim = L.marker([35.2298984, -80.75039370000002]).bindPopup('Muslim American Society'),
//             uscis = L.marker([35.1767738, -80.88124929999998]).bindPopup('USCIS Application Center');

//         agencies1 = L.layerGroup([ourBridge, crra, catholic]);
//         agencies2 = L.layerGroup([international, muslim, uscis]);

//         L.control.layers(agencies1, agencies2).addTo(mymap);

//          let buildingIcon = L.icon({
//             iconUrl: 'img/building-15.svg',
//             iconSize: [24, 24],
//             iconAnchor: [12, 22],
//             popupAnchor: [0, -24],
//         });

//         let markersArray = [];
//         for (let i = 0; i < agencies1.length; i++) {
//             markersArray[i] = new L.marker(agencies1[i], {icon: buildingIcon}).addTo(mymap);
//         };
//     }




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
