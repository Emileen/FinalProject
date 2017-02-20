module.exports = {
    name: 'viewHealthClinics',
    func: function ($scope, charlotteMapService) {

        $scope.healthClinics = charlotteMapService.getHealthClinics();
    }
};