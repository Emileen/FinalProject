module.exports = {
    name: 'joinNetwork',
    func: function ($scope, regFormService) {
        $scope.registration = {
           name: null,
           address: null,
           phoneNumber: null,
           contactPerson: null,
           email: null,
           website: null,   
        };

        $scope.submitRegistration = function() {
            regFormService.add($scope.registration)
        }
       
    },
};