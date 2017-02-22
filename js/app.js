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
