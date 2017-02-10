module.exports = {
    name: 'viewNetwork',
    func: function ($scope, regFormService) {

        $scope.forms = regFormService.getAll();
    }
};




