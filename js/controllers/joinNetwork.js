module.exports = {
    name: 'joinNetwork',
    func: function ($scope, regFormService) {
        $scope.regForm = {
           name: null,
           address: null,
           phoneNumber: null,
           email: null,
           contactPerson: null,
           website: null,   
        };

        $scope.submitRegistration = function() {
            regFormService.add($scope.regForm)
        }
       
    },
};