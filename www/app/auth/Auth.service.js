
(function () {
    'use strict';

    angular.module( 'auth' )
        .service( 'Auth', function ($q, $http, AuthTokenFactory, UserPreferences, Stash ) {
            var data = { bLoggedIn: false };

            /**
             * Authenticates credentials against the server, and upon successful login
             * stores the token and the username used, and a flag to indicate whether
             * the user is currently logged in.
             *
             * @param {object} credentials
             * @param {string} credentials.sUsername
             * @param {string} credentials.sPassword
             * @param {string} credentials.sDocBaseName
             *
             * @returns {promise}
             * @resolve {boolean} true for successful login
             * @reject  {boolean} false for unsuccessful login
             */
            function authenticate( credentials ) {
                return $q( function ( resolve, reject ) {
                    // reject if we're missing properties
                    if ( !credentials.hasOwnProperty( 'email' ) || !credentials.hasOwnProperty( 'passphrase' ) ) {
                        reject( { errorDescription: 'Invalid Credentials' } ); // TODO: publish proper message
                        return false;
                    }
                    // reject if properties are empty
                    if ( !credentials.email || !credentials.passphrase ) {
                        reject( { errorDescription: 'Invalid Credentials' } ); // TODO: publish proper message
                        return false;
                    }

                    Stash.start( credentials ).then( function ( response ) {
                        data.bLoggedIn = true;
                        // store the token
                        AuthTokenFactory.setToken( response.data.SESSIONKEY );
                        // store the user guid
                        UserPreferences.setLoginUsername( credentials.email );
                        resolve( true );
                    }, function ( err ) {
                        data.bLoggedIn = false;
                        PubSub.publish( 'notifications', Util.composeErrorMessage( err, Labels.get( 'errors.authentication') ) );
                        reject( err );
                    } );
                } );
            }

            /**
             * Deletes the stored authentication token
             *
             * @returns {promise}
             */
            function logout() {
                return $q( function ( resolve ) {
                    // remove the token
                    AuthTokenFactory.setToken();
                    resolve();
                } );
            }

            return {
                authenticate: function ( credentials ) {
                    return authenticate( credentials );
                },
                logout:       function () {
                    return logout();
                },
                data: data
            };
        });
})();