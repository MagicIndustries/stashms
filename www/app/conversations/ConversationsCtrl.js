(function () {
    'use strict';
    angular.module( 'conversations' )
        .controller( 'ConversationsCtrl', function ( $rootScope, Stash, $state, Context ) {
            var vm = this;
            vm.viewMessage = viewMessage;

            Context.setAppTitle( 'Messages' );

            Stash.list().then( function ( data ) {
              vm.aList = data.data;
                // DEBUG: remove this
                console.log( data.data );
            });

            function viewMessage ( msgID ) {
                Stash.getMessage( msgID ).then( function ( result ) {
                  $state.go( 'message' );
                });
            }

        })
})();

