/**
 * <File Description>
 *
 * Created By:          Toby Tremayne <toby@magicindustries.net>
 * Created On:          19/02/15
 * ComponentID:
 * Last Updated:        $LastChangedDate: 2015-04-21 15:58:21 +1000 (Tue, 21 Apr 2015) $
 * Last Updated By:     $LastChangedBy: ttremayne $
 * Revision:            $LastChangedRevision: 41 $
 *
 **/
(function () {
    'use strict';
    angular.module( 'auth' )
        .factory( 'AuthHTTPInterceptor', function ( AuthTokenFactory, $location, $q ) {
            return {
                request: addToken,
                responseError: responseError
            };

            /**
             * Adds the JWT to the Authorization Bearer header
             *
             * @param config
             * @returns {object} config
             */
            function addToken(config) {
                var token = AuthTokenFactory.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    //config.headers.Authorization = 'Bearer ' + token;
                    config.headers.authorization = token;
                }
                return config;
            }

            /**
             * Intercepts 401 (Unauthorized) and 419 (Expired Token) and redirects the user to login
             *
             * @param response
             * @returns {Promise}
             */
            function responseError(response) {
                if(response.status === 401 || response.status === 419) {
                    $location.path('/login');
                    // remove any stale tokens
                    AuthTokenFactory.setToken();
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        });
})();