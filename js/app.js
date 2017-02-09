const app = angular.module('NetworkApp', ['ui.router']);

let joinNetwork = require('./controllers/joinNetwork');
let viewNetwork = require('./controllers/viewNetwork');
const controllers = [
    joinNetwork,
    viewNetwork,
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


/* Services */
app.factory('regFormService', function ($http) {
    let forms = [];

    return {
        
        add(regForm) {
            $http.post('https://stormy-badlands-83991.herokuapp.com/registration', {
                name: regForm.name,
                address: regForm.address,
                phone: regForm.phone_number,
                email: regForm.email,
                contact_person: regForm.contact_person,
                website: regForm.website,
            });
        },

        getAll() {
            $http.get('https://stormy-badlands-83991.herokuapp.com/').then(function (response) {
                angular.copy(response.data.registration, forms);
            });
            
            return forms;
        },

    };

})

//Leaflet stuff
// let mymap = L.map('charlotteMap').setView([35.196, -80.792], 13);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'your.mapbox.project.id',
//     accessToken: 'pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag'
// }).addTo(mymap);