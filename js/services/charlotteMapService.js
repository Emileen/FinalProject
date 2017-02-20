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
                return $http.get('https://connectingcommunities.herokuapp.com/').then(function (response) {
                    // angular.copy(response.data, agencies);
                    return response.data;
                });

                // return agencies;
            },

            getHealthClinics() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/health/').then(function (response) {
                    // angular.copy(response.data, healthClinics);
                    return response.data;
                });

            },

            getCisSchools() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/communitiesinschools/').then(function (response) {
                    // angular.copy(response.data, healthClinics);
                    return response.data;
                });

            },

            getLanguageImmersionSchools() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/languageimmersion/').then(function (response) {
                    // angular.copy(response.data, healthClinics);
                    return response.data;
                });

            },

            getLibraries() {
                return $http.get('https://connectingcommunities.herokuapp.com/resource/library/').then(function (response) {

                    return response.data;
                });

            },

            getName(searchName) {
                $http.get('https://connectingcommunities.herokuapp.com/search/' + searchName).then(function (response) {
                    angular.copy(response.data, searchLocations);
                });
                console.log(response);
                // return name;
            },

        };
    }
}

