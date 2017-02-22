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

        $scope.submitRegistration = function() {
            regFormService.add($scope.registration)
        }

        $scope.name = '';
        $scope.address = '';
        $scope.phoneNumber = '';
        $scope.contactPerson = '';
        $scope.email = '';
        $scope.website = '';
        $scope.category = '';
       
    },
};