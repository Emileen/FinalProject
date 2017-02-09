module.exports = {
    name: 'joinNetwork',
    func: function ($scope, regFormService) {
        $scope.regForm = {
           name: null,
           address: null,
           phone_number: null,
           email: null,
           contact_person: null,
           website: null,   
        };

        $scope.submitRegistration = function() {
            regFormService.add($scope.regForm)
        }
       
    },
};