angular.module( 'message' )
    .controller( 'MessageViewCtrl', function ( $rootScope, Stash, $stateParams ) {
        var vm = this;

        Stash.getMessage( $stateParams.msgID ).then( function ( response ) {
            vm.msg = response;
        });

    } );