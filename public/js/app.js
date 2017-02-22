(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('NetworkApp', ['ui.router']);

const joinNetwork = require('./controllers/joinNetwork');
const charlotteMap = require('./controllers/charlotteMap');
// const viewNetwork = require('./controllers/viewNetwork');



const controllers = [
    joinNetwork,
    charlotteMap,
    // viewNetwork,
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
        name: 'charlotte-map',
        url: '/charlotteMap',
        component: 'charlotteMap',
    });

    $stateProvider.state({
        name: 'home-page',
        url: '/homePage',
        component: 'homePage',
    });

    $stateProvider.state({
        name: 'home',
        url: '',
        component: 'homePage',
    });

    // $stateProvider.state({
    //     name: 'view-network',
    //     url: '/viewNetwork',
    //     component: 'viewNetwork',
    // });

});

//COMPONENTS 
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

app.component('homePage', {
    templateUrl: 'templates/homePage.html',
});

//SERVICES
const services = [
    require('./services/regFormService'),
    require('./services/charlotteMapService'),
];

for (let i = 0; i < services.length; i++) {
    app.factory(services[i].name, services[i].func);
};

},{"./controllers/charlotteMap":2,"./controllers/joinNetwork":3,"./services/charlotteMapService":4,"./services/regFormService":5}],2:[function(require,module,exports){
module.exports = {
    name: 'charlotteMap',
    func: function ($scope, charlotteMapService) {

        //DIFFERENT LAYER GROUPS
        const layers = {
            agencies: null,
            health: null,
            schoolsC: null,
            schoolsL: null,
            cmLibraries: null,
            searchMarkers: null,
            all: null,
        };

        // hiding markers
        // $scope.hideAgencies = function () {
        //     layers.agencies.removeFrom(mymap);
        // };

        //SHOWING MARKERS FUNCTIONS
        $scope.showAgencies = function () {
            layers.agencies.addTo(mymap);
            layers.health.removeFrom(mymap);
            layers.schoolsC.removeFrom(mymap);
            layers.schoolsL.removeFrom(mymap);
            layers.cmLibraries.removeFrom(mymap);

        };

        $scope.showHealth = function () {
            layers.agencies.removeFrom(mymap);
            layers.health.addTo(mymap);
            layers.schoolsC.removeFrom(mymap);
            layers.schoolsL.removeFrom(mymap);
            layers.cmLibraries.removeFrom(mymap);

        };

        $scope.showSchoolsC = function () {
            layers.agencies.removeFrom(mymap);
            layers.health.removeFrom(mymap);
            layers.schoolsC.addTo(mymap);
            layers.schoolsL.addTo(mymap);
            layers.cmLibraries.removeFrom(mymap);

        };

        $scope.showCmLibraries = function () {
            layers.agencies.removeFrom(mymap);
            layers.health.removeFrom(mymap);
            layers.schoolsC.removeFrom(mymap);
            layers.schoolsL.removeFrom(mymap);
            layers.cmLibraries.addTo(mymap);

        };

        $scope.showAll = function () {
            layers.agencies.addTo(mymap);
            layers.health.addTo(mymap);
            layers.schoolsC.addTo(mymap);
            layers.schoolsL.addTo(mymap);
            layers.cmLibraries.addTo(mymap);

        };

        $scope.hideAll = function () {
            layers.agencies.removeFrom(mymap);
            layers.health.removeFrom(mymap);
            layers.schoolsC.removeFrom(mymap);
            layers.schoolsL.removeFrom(mymap);
            layers.cmLibraries.removeFrom(mymap);

        };


        //SEARCH SCOPE

        $scope.searchName = '';

        $scope.getName = function () {

            charlotteMapService.getName($scope.searchName)

        }

        //CHARLOTTE MAP
        let mymap = L.map('mapid').setView([35.226944, -80.843333], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/lclark070607/ciz2xr2gg002r2rqb9g2r41ut/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 13,
            minZoom: 9,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag'
        }).addTo(mymap);

        // AGENCIES MARKERS
        charlotteMapService.getAgencies().then(function (agencies) {
            let markers = [];

            let agencyIcon = L.AwesomeMarkers.icon({
                icon: 'fa-institution',
                prefix: 'fa',
                markerColor: 'red',
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < agencies.length; i++) {
                let agency = new L.marker([agencies[i].latitude, agencies[i].longitude], { icon: agencyIcon });

                let popup = L.popup({
                    minWidth: 100,
                }).setContent('<img src="img/AGENCIES (2).png"></img>' + '<br>' + '<p><a href="' + agencies[i].website + '">' + agencies[i].name + '</a></p>' + '<br>' + agencies[i].address + '<br>' + '<a href="tel:' + agencies[i].phoneNumber + '">' + agencies[i].phoneNumber + '</a>');

                agency.bindPopup(popup);
                markers.push(agency);
            };

            layers.agencies = L.layerGroup(markers);
            layers.agencies.addTo(mymap);
        });

        // HEALTH CLINICS MARKERS
        charlotteMapService.getHealthClinics().then(function (healthClinics) {
            let markers2 = [];

            let healthIcon = L.AwesomeMarkers.icon({
                icon: 'fa-medkit',
                prefix: 'fa',
                markerColor: 'green',
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < healthClinics.length; i++) {
                let health = new L.marker([healthClinics[i].latitude, healthClinics[i].longitude], { icon: healthIcon });

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<img src="img/AGENCIES (3).png"></img>' + '<p><a href="' + healthClinics[i].website + '">' + healthClinics[i].name + '</a><p>' + '<br>' + healthClinics[i].address + '<br>' + '<a href="tel:' + healthClinics[i].contactNumber + '">' + healthClinics[i].contactNumber + '</a>');

                health.bindPopup(popup);
                markers2.push(health);
            };

            layers.health = L.layerGroup(markers2);
            layers.health.addTo(mymap);

        });

        //COMMUNITIES IN SCHOOLS MARKERS
        charlotteMapService.getCisSchools().then(function (cisSchools) {
            let markers3 = [];

            let schoolIcon = L.AwesomeMarkers.icon({
                icon: 'fa-book',
                prefix: 'fa',
                markerColor: 'blue',
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < cisSchools.length; i++) {
                let schoolsC = new L.marker([cisSchools[i].latitude, cisSchools[i].longitude], { icon: schoolIcon });

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<img src="img/SCHOOLC.png"></img>' + '<p>' + cisSchools[i].name + '</p><br>' + cisSchools[i].address + '<br>' + '<a href="tel:' + cisSchools[i].contactNumber + '">' + cisSchools[i].contactNumber + '</a>');

                schoolsC.bindPopup(popup);
                markers3.push(schoolsC);
            };

            layers.schoolsC = L.layerGroup(markers3);
            layers.schoolsC.addTo(mymap);

        });

        //LANGUAGE IMMERSION SCHOOLS MARKERS

        charlotteMapService.getLanguageImmersionSchools().then(function (languageImmersionSchools) {
            let markers4 = [];

            let schoolLangIcon = L.AwesomeMarkers.icon({
                icon: 'fa-book',
                prefix: 'fa',
                markerColor: 'orange',
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < languageImmersionSchools.length; i++) {
                let schoolsL = new L.marker([languageImmersionSchools[i].latitude, languageImmersionSchools[i].longitude], { icon: schoolLangIcon });

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<img src="img/schoolL.png"></img>' + '<p>' + languageImmersionSchools[i].name + '</p><br>' + languageImmersionSchools[i].address + '<br>' + '<a href="tel:' + languageImmersionSchools[i].contactNumber + '">' + languageImmersionSchools[i].contactNumber + '</a>');

                schoolsL.bindPopup(popup);
                markers4.push(schoolsL);
            };
            layers.schoolsL = L.layerGroup(markers4);
            layers.schoolsL.addTo(mymap);

        });

        //LIBRARIES MARKERS

        charlotteMapService.getLibraries().then(function (libraries) {
            let markers5 = [];

            let librariesIcon = L.AwesomeMarkers.icon({
                icon: 'fa-pencil',
                prefix: 'fa',
                markerColor: 'purple',
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < libraries.length; i++) {
                // console.log(libraries[i].photo);
                //console.log(libraries[i].website);
                let cmLibraries = new L.marker([libraries[i].latitude, libraries[i].longitude], { icon: librariesIcon });
                // console.log(libraries[1].website)
                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<img src="img/library.png"></img>' + '<p><a href="' + libraries[i].website + '">' + libraries[i].name + '</a></p><br>' + libraries[i].address + '<br>' + '<a href="tel:' + libraries[i].contactNumber + '">' + libraries[i].contactNumber + '</a>');

                cmLibraries.bindPopup(popup);
                markers5.push(cmLibraries);
            };
            layers.cmLibraries = L.layerGroup(markers5);
            layers.cmLibraries.addTo(mymap);


        });

        //SEARCH MARKERS

        $scope.getName = function () {

            charlotteMapService.getName($scope.searchName).then(function (search) {
                let markers6 = [];

                let searchIcon = L.AwesomeMarkers.icon({
                    icon: 'fa-star',
                    prefix: 'fa',
                    markerColor: 'orange',
                    iconAnchor: [12, 22],
                    popupAnchor: [0, -24],
                });

                for (let i = 0; i < search.length; i++) {
                    let searchMarkers = new L.marker([search[i].latitude, search[i].longitude], { icon: searchIcon });


                    let popup = L.popup({
                        minWidth: 250,
                    }).setContent('<p>' + search[i].name + '</p><br>' + search[i].address + '<br>' + search[i].phoneNumber);

                    searchMarkers.bindPopup(popup);
                    markers6.push(searchMarkers);
                };

                    layers.searchMarkers = L.layerGroup(markers6);
                    layers.searchMarkers.addTo(mymap);
                    $scope.hideAll();
                    $scope.searchName = "";


                })
        };

    }
};

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
            category: '',
        };

        $scope.submitRegistration = function () {
            regFormService.add($scope.registration)


            $scope.registration = {
                name: '',
                address: '',
                phoneNumber: '',
                contactPerson: '',
                email: '',
                website: '',
                category: '',
            };
        }

    },
};
},{}],4:[function(require,module,exports){
module.exports = {

    name: "charlotteMapService",
    func: function ($http) {

        let agencies = [];
        let healthClinics = [];
        let cisSchools = [];
        let languageImmersionSchools = [];
        let libraries = [];
        let searchLocations = [];


        return {
            getAgencies() {
                return $http.get('https://connectingcommunities.herokuapp.com/agencies').then(function (response) {
                    return response.data;
                });
            },

            getHealthClinics() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/health/').then(function (response) {
                    return response.data;
                });
            },

            getCisSchools() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/communitiesinschools/').then(function (response) {
                    return response.data;
                });
            },

            getLanguageImmersionSchools() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/languageimmersion/').then(function (response) {
                    return response.data;
                });
            },

            getLibraries() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/library/').then(function (response) {
                    return response.data;
                });
            },

            getName(searchName) {
                return $http.get('https://connectingcommunities.herokuapp.com/search/' + searchName).then(function (response) {
                    return response.data;
                });
            },

        };
    }
}


},{}],5:[function(require,module,exports){
module.exports = {
    name: "regFormService",
    func: function ($http) {
        let forms = [];

        return {

            add(registration) {
                $http.post('https://connectingcommunities.herokuapp.com/registration', {
                    name: registration.name,
                    address: registration.address,
                    phoneNumber: registration.phoneNumber,
                    email: registration.email,
                    contactPerson: registration.contactPerson,
                    website: registration.website,
                    category: registration.category,
                });
                
                console.log(registration);
            },

            getAll() {
                $http.get('https://connectingcommunities.herokuapp.com/').then(function (response) {
                    angular.copy(response.data, forms);
                });

                return forms;
            },

        };
    }
}

},{}]},{},[1]);
