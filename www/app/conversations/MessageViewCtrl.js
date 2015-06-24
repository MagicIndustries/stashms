angular.module( 'conversations' )
    .controller( 'MessageViewCtrl', function ( $rootScope, Stash ) {
        var vm = this;
        vm.stashData = Stash.data;

    } );