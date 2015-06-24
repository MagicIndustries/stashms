(function () {
    'use strict';
    angular.module( 'conversations' )
        .controller( 'ComposeCtrl', function ( $rootScope, Stash, $state, Context ) {
            var vm = this;
            vm.send = send;
            Context.setAppTitle( 'New Message' );

            vm.msgData = {
                msg: '',
                recipient: '',
                autoExpire: true
            };

            function cancel () {
                // TODO: pubsub message
                $state.go( 'conversations' );
            }

            function send ( msgForm ) {
                // DEBUG: remove this
                console.log( msgForm );
                if ( msgForm.$valid ) {
                    Stash.text( vm.msgData ).then( function ( response ) {
                        //TODO: pubsub message
                        $state.go( 'conversations' );
                    }, function ( err ) {
                        // TODO: display failure, allow retry
                    } )
                }
            }
        })
})();

