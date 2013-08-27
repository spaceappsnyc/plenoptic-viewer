/**
* Data service for depth map.
*/

Application.Services.factory('depthMap', ['configuration', '$q', '$http', function (configuration, $q, $http) {
    'use strict';
    return {
        /**
        * Retrieves the depth map for the passed image id.
        * @param {string} id of the image
        * @return {Promise} Resolves to floating point depth map array
        */
        get : function (id) {
            var deferred;

            deferred = $q.defer();

            $http.get(configuration.DATA_URL + id + configuration.DEPTH_MAP_SUFFIX).success(function (data, status, headers, config) {

                var result;

                try {

                    //trim the last character if it's a new line.
                    if (data.lastIndexOf('\n') === data.length - 1) {
                        data = data.slice(0, -1);
                    }

                    //convert the string into an array and parse the values to floating point numbers
                    result = _(data.split('\n')).map(function (value) {
                        return parseFloat(value);
                    });

                } catch (error) {
                    deferred.reject(error);
                }

                deferred.resolve(result);

            }).error(function (data, status, headers, config) {

                console.error(data, status, headers, config);
                deferred.reject(data);

            });

            return deferred.promise;
        }
    };
}]);