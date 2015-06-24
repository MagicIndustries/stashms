/**
 * Main Controller for Auth / Login
 *
 * Created By:          Toby Tremayne <toby@magicindustries.net>
 * Created On:          9/02/2015
 * ComponentID:         UXP_W02
 * Last Updated:        $LastChangedDate: 2015-04-21 15:58:21 +1000 (Tue, 21 Apr 2015) $
 * Last Updated By:     $LastChangedBy: ttremayne $
 * Revision:            $LastChangedRevision: 41 $
 *
 */
(function () {
    'use strict';
    
    angular.module( 'auth' )

        .controller( 'AuthCtrl', function ( Auth, $state, UserPreferences ) {
            var vm = this;
            vm.doLogin = doLogin;

            // if the user is logged in, redirect straight to the start page
            if ( Auth.data.bLoggedIn ) {
                $state.go( 'messageList' );
            }

            // empty the login form
            vm.oLoginData = {
                email:  'toby@magicindustries.net',
                passphrase:  'XdM3O8VzpCXu'
            };

            // default the username if we can
            //vm.oLoginData.email = UserPreferences.getLoginUsername();

            function doLogin() {
                Auth.authenticate( vm.oLoginData ).then( function () {
                    $state.go( 'messageList' );
                }, function ( err ) {
                    //PubSub.publish( 'notifications', {
                    //    msg: err.errorDescription || 'An error occurred, please try again',
                    //    type: 'danger',
                    //    detail: null,
                    //    err: err
                    //});
                    $state.go( 'login' );
                });
            }
        });
})();