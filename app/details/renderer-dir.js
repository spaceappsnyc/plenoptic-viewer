/**
* Defines a menu item.
*/

Application.Directives.directive('menuItem', function () {
    'use strict';
    return {
        restrict : 'A',
        link : function (scope, element, attrs) {
            console.log(scope.depthMap);
        }
    };
});