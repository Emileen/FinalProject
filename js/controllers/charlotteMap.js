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



        // charlotteMapService.getAgencies().then(function (agencies) {
        //     console.log('got the agencies');

        //     let buildingIcon = L.icon({
        //         iconUrl: 'img/building-15.svg',
        //         iconSize: [24, 24],
        //         iconAnchor: [12, 22],
        //         popupAnchor: [0, -24],
        //     });


        //     for (let i = 0; i < agencies.length; i++) {
        //         L.marker([agencies[i].latitude, agencies[i].longitude], { icon: buildingIcon }).addTo(mymap);
        //     }

        // });

        // charlotteMapService.getHealthClinics().then(function (healthClinics) {

        //     let healthIcon = L.icon({
        //         iconUrl: 'img/defibrillator-15.svg',
        //         iconSize: [24, 24],
        //         iconAnchor: [12, 22],
        //         popupAnchor: [0, -24],
        //     });

        //     for (let i = 0; i < healthClinics.length; i++) {
        //         L.marker([healthClinics[i].latitude, healthClinics[i].longitude], { icon: healthIcon }).addTo(mymap);
        //     }

        // });

           charlotteMapService.getSchools().then(function (schools) {

            let schoolIcon = L.icon({
                iconUrl: 'img/building-15.svg',
                iconSize: [24, 24],
                iconAnchor: [12, 22],
                popupAnchor: [0, -24],
            });

            for (let i = 0; i < schools.length; i++) {
                L.marker([schools[i].latitude, schools[i].longitude], { icon: schoolIcon }).addTo(mymap);
            }

        });

        // charlotteMapService.getLibraries().then(function (libraries) {

        //     let librariesIcon = L.icon({
        //         iconUrl: 'img/defibrillator-15.svg',
        //         iconSize: [24, 24],
        //         iconAnchor: [12, 22],
        //         popupAnchor: [0, -24],
        //     });

        //     for (let i = 0; i < libraries.length; i++) {
        //         // L.marker([libraries[i].latitude, libraries[i].longitude], { icon: librariesIcon }).addTo(mymap);
        //         L.marker(libraries.coordinates[i], { icon: librariesIcon }).addTo(mymap);
        //     }

        // });
    }

}





//             let popup = L.popup({
//                 minWidth: 400

//             }).setContent({{$scope.name }} {{$scope.address }} {{ $scope.phoneNumber } });

// agencies[i].bindPopup(popup);
//         });







