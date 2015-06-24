(function () {
    'use strict';
    angular.module( 'header' )
        .directive( 'header', function (  ) {
            return {
                scope: {
                    menuItems: '@',
                    searchValue: '='
                },
                replace: true,
                restrict: 'E',
                controller: function ( $scope, Context, AuthTokenFactory, Auth ) {
                    $scope.doLogout = logout;
                    //$scope.search = search;
                    //$scope.toggleSideNav = toggleSideNav;
                    // grab the context data so we can bind to the app title
                    $scope.contextData = Context.data;
                    //$scope.username = UserPreferences.getLoginUsername();

                    //$scope.queueData = Queue.data;
                    //$scope.$watch( 'queueData.', function ( newval ) {
                    //    if (newval === 0) {
                    //        // DEBUG: remove this
                    //        console.log( 'not busy' );
                    //        $scope.bShowBusyIndicator = false;
                    //    } else {
                    //        // DEBUG: remove this
                    //        console.log( 'busy' );
                    //        $scope.bShowBusyIndicator = true;
                    //    }
                    //});

                    function logout () {
                        // DEBUG: remove this
                        console.log( 'logging out' );
                        AuthTokenFactory.setToken();
                        Auth.data.bLoggedIn = false;
                        $state.go( 'login' );
                    }
                    //
                    //function toggleSideNav() {
                    //    $mdUtil.debounce(function(){
                    //        $mdSidenav( 'leftsidenav' )
                    //            .toggle()
                    //            .then(function () {
                    //            });
                    //    },300)();
                    //}

                },
                templateUrl: 'components/header/header.html'
            }
        });
})();