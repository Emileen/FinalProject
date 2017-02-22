module.exports = {
    name: 'joinNetwork',
    func: function ($scope, regFormService) {
        $scope.registration = {
            name: '',
            address: '',
            phoneNumber: '',
            contactPerson: '',
            email: '',
            website: '',
            category: '',
        };

        $scope.submitRegistration = function () {
            regFormService.add($scope.registration)


            $scope.registration = {
                name: '',
                address: '',
                phoneNumber: '',
                contactPerson: '',
                email: '',
                website: '',
                category: '',
            };
        }

    },
};