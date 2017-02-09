const app = angular.module('NetworkApp', ['ui.router']);

let joinNetwork = require('./controllers/joinNetwork');

const controllers = [
    joinNetwork,
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
});

/* Defining a component */
app.component('joinNetwork', {
    controller: 'joinNetwork',
    templateUrl: 'templates/joinNetwork.html',
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