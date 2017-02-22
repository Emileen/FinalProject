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
