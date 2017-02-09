(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./controllers/joinNetwork":2}],2:[function(require,module,exports){
module.exports = {
    name: 'joinNetwork',
    func: function ($scope, regFormService) {
        $scope.regForm = {
           name: null,
           address: null,
           phone_number: null,
           email: null,
           contact_person: null,
           website: null,   
        };

        $scope.submitRegistration = function() {
            regFormService.add($scope.regForm)
        }
       
    },
};
},{}]},{},[1]);
