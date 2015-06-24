(function () {
    'use strict';
    angular.module( 'message' )
        .controller( 'MessageListCtrl', function ( $rootScope, Stash, $state, Context ) {
            var vm = this;
            vm.viewMessage = viewMessage;
            vm.delete = deleteMessage;

            Context.setAppTitle( 'Messages' );

            getMessageList();

            function getMessageList (  ) {
                Stash.list().then( function ( data ) {
                    vm.aList = data.data;
                });
            }

            function viewMessage ( msgID ) {
                Stash.getMessage( msgID ).then( function ( result ) {
                    //TODO: PUBSUB message
                  $state.go( 'message' );
                });//TODO: handle error
            }

            function deleteMessage ( msgID, $event ) {
                $event.preventDefault();
                $event.stopPropagation();
              Stash.remove( msgID ).then( function ( result ) {
                  //TODO: PUBSUB message
                  getMessageList();
              })//TODO: handle error
            }

        })
})();

