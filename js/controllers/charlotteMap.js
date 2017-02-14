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



