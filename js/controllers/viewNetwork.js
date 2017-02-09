module.exports = {
    name: 'viewNetwork',
    func: function ($scope, regFormService) {

        $scope.regForm = regFormService.getAll();
    }
};




