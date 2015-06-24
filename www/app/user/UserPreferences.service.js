
(function () {
    'use strict';

    angular.module( 'user' )
        .service( 'UserPreferences', function ( $window ) {

            /**
             * Setter for login username
             *
             * @param loginUsername
             * @param $window
             */
            function setLoginUsername ( loginUsername, $window ) {
                $window.localStorage.setItem( 'loginUsername', loginUsername);
            }

            /**
             * Getter for Login username
             * @param $window
             * @returns {string} loginUsername
             */
            function getLoginUsername ( $window ) {
              return $window.localStorage.getItem( 'loginUsername' );
            }

            return {
                setLoginUsername: function ( loginUsername ) {
                    return setLoginUsername( loginUsername, $window );
                },
                getLoginUsername: function() {
                    return getLoginUsername( $window );
                }
            };
        } );
})();