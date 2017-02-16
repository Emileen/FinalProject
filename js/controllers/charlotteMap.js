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







