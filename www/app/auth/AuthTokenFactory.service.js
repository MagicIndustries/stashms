/**
 * Factory service to manage the JWT authentication token
 *
 * Created By:          Toby Tremayne <toby@magicindustries.net>
 * Created On:          11/03/15
 * ComponentID:         UXP_W02
 * Last Updated:        $LastChangedDate: 2015-04-21 15:58:21 +1000 (Tue, 21 Apr 2015) $
 * Last Updated By:     $LastChangedBy: ttremayne $
 * Revision:            $LastChangedRevision: 41 $
 *
 **/
(function () {
    'use strict';
    angular.module( 'auth' )
        .provider( 'AuthTokenFactory', function () {
            var key = 'auth-token';

            /**
             * Retrieves the JWT from localStorage
             *
             * @param $window
             * @returns {*}
             */
            function getToken($window) {
                return $window.localStorage.getItem(key);
            }

            /**
             * Stores the JWT in localStorage
             *
             * @param token
             * @param $window
             */
            function setToken(token, $window) {
                if (token) {
                    $window.localStorage.setItem(key, token);
                } else {
                    $window.localStorage.removeItem(key);
                }

            }

            return {
                $get: function ($window) {
                    return {
                        getToken: function () {
                            return getToken($window);
                        },
                        setToken: function (token) {
                            return setToken(token, $window);
                        }
                    };
                }
            };
        });
})();

