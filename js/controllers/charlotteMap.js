module.exports = {
    name: 'charlotteMap',
    func: function ($scope, charlotteMapService) {
        // different layer groups
        const layers = {
            agencies: null,
            health: null,
            schoolsC: null,
            schoolsL: null,
            cmLibraries: null,
            all: null,
        };

// hiding markers
        // $scope.hideAgencies = function () {
        //     layers.agencies.removeFrom(mymap);
        // };


// showing markers
        $scope.showAgencies = function () {
            layers.agencies.addTo(mymap);
            layers.health.removeFrom(mymap);
            layers.schoolsC.removeFrom(mymap);
            layers.schoolsL.removeFrom(mymap);
            // layers.cmLibraries.removeFrom(mymap);
        };

        $scope.showHealth = function () {
            layers.agencies.removeFrom(mymap);
            layers.health.addTo(mymap);
            layers.schoolsC.removeFrom(mymap);
            layers.schoolsL.removeFrom(mymap);
            // layers.cmLibraries.removeFrom(mymap);
        };

        $scope.showSchoolsC = function () {
            layers.agencies.removeFrom(mymap);
            layers.health.removeFrom(mymap);
            layers.schoolsC.addTo(mymap);
            layers.schoolsL.addTo(mymap);
            // layers.cmLibraries.removeFrom(mymap);
        };

        // $scope.cmLibraries = function () {
        //     layers.agencies.removeFrom(mymap);
        //     layers.health.removeFrom(mymap);
        //     layers.schoolsC.removeFrom(mymap);
        //     layers.schoolsL.removeFrom(mymap);
        //     layers.cmLibraries.addTo(mymap);
        // };

        $scope.showAll = function () {
            layers.agencies.addTo(mymap);
            layers.health.addTo(mymap);
            layers.schoolsC.addTo(mymap);
            layers.schoolsL.addTo(mymap);
            // layers.cmLibraries.addTo(mymap);
        };

        

        let mymap = L.map('mapid').setView([35.226944, -80.843333], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/lclark070607/ciz2xr2gg002r2rqb9g2r41ut/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 13,
            minZoom: 5,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibGNsYXJrMDcwNjA3IiwiYSI6ImNpeXV3dDljdjAwNDMzM3FtMmg2eHRsMDUifQ.ECOVir2_PAilBlx3n8RUag'
        }).addTo(mymap);


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
                    minWidth: 250,
                }).setContent('<h3>' + agencies[i].name + '</h3><br>' + agencies[i].address + '<br>' + agencies[i].phoneNumber);

                agency.bindPopup(popup);
                markers.push(agency);
            };

            layers.agencies = L.layerGroup(markers);
            layers.agencies.addTo(mymap);
        });



        charlotteMapService.getHealthClinics().then(function (healthClinics) {
            let markers2 = [];

            let healthIcon = L.AwesomeMarkers.icon({
                icon: 'fa-heart-o',
                prefix: 'fa',
                markerColor: 'green',
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < healthClinics.length; i++) {
                let health = new L.marker([healthClinics[i].latitude, healthClinics[i].longitude], { icon: healthIcon });

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<h3>' + healthClinics[i].name + '</h3><br>' + healthClinics[i].address + '<br>' + healthClinics[i].contactNumber);

                health.bindPopup(popup);
                markers2.push(health);
            };

            layers.health = L.layerGroup(markers2);
            layers.health.addTo(mymap);

        });

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
                }).setContent('<h3>' + cisSchools[i].name + '</h3><br>' + cisSchools[i].address + '<br>' + cisSchools[i].contactNumber);

                schoolsC.bindPopup(popup);
                markers3.push(schoolsC);
            };

            layers.schoolsC = L.layerGroup(markers3);
            layers.schoolsC.addTo(mymap);

        });

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
                }).setContent('<h3>' + languageImmersionSchools[i].name + '</h3><br>' + languageImmersionSchools[i].address + '<br>' + languageImmersionSchools[i].phoneNumber);

                schoolsL.bindPopup(popup);
                markers4.push(schoolsL);
            };
            layers.schoolsL = L.layerGroup(markers4);
            layers.schoolsL.addTo(mymap);

        });

        charlotteMapService.getLibraries().then(function (libraries) {
            let markers5 = [];

            let librariesIcon = L.AwesomeMarkers.icon({
                icon: 'fa-book',
                prefix: 'fa',
                markerColor: 'yellow',
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < libraries.length; i++) {
                let cmLibraries = new L.marker([libraries[i].latitude, libraries[i].longitude], { icon: librariesIcon });

                let popup = L.popup({
                    minWidth: 250,
                }).setContent('<h3>' + libraries[i].name + '</h3><br>' + libraries[i].address + '<br>' + libraries[i].phoneNumber);

                cmLibraries.bindPopup(popup);
                markers4.push(schoolsL);
            };
            layers.cmLibraries = L.layerGroup(markers5);
            layers.cmLibraries.addTo(mymap);

        });

        //GeoJSON layer - incomplete info from api

        // let cmLibraries = [];

        // var geojsonLayer = L.geoJson.ajax('https://raw.githubusercontent.com/mecklenburg-gis/mecklenburg-gis-opendata/master/data/libraries.geojson', {
        //     onEachFeature: function (data, layer) {
        //         cmLibraries.push(layer);
        //         layer.bindPopup('<h3>' + data.properties.name + '</h3><br>' + '<p>' + data.properties.address + '</p>');
        //     }
        // });

        // geojsonLayer.addTo(mymap);









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







