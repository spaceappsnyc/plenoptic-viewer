
Application.Controllers.controller('details', ['$scope', '$routeParams', 'depthMap', function ($scope, $routeParams, depthMap) {
    'use strict';
    var id;

    id = $routeParams.id;

    $scope.id = id;

    $scope.depthMap = depthMap.get(id);


}]);