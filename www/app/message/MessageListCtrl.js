(function () {
    'use strict';
    angular.module( 'message' )
        .controller( 'MessageListCtrl', function ( $rootScope, Stash, $state, Context, PubSub ) {
            var vm = this;
            vm.viewMessage = viewMessage;
            vm.delete = deleteMessage;
            vm.newMsg = newMsg;

            function newMsg () {
                $state.go( 'compose' );
            }

            Context.setAppTitle( 'Messages' );

            getMessageList();

            function getMessageList (  ) {
                Stash.list().then( function ( data ) {
                    vm.aList = data.data;
                });
            }

            function viewMessage ( msgID ) {
                Stash.getMessage( msgID ).then( function ( result ) {
                  $state.go( 'message', { msgID: msgID } );
                });
            }

            function deleteMessage ( msgID, $event ) {
                $event.preventDefault();
                $event.stopPropagation();
              Stash.remove( msgID ).then( function ( result ) {
                  PubSub.publish( 'notifications', {
                      type: 'success',
                      msg: 'Message Deleted'
                  });
                  getMessageList();
              }, function ( err ) {
                  PubSub.publish( 'notifications', {
                      type: 'danger',
                      msg: 'An error occurred while attempting to delete the message',
                      err: err
                  });
              })
            }

        })
})();

