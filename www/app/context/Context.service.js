(function () {
    'use strict';
    angular.module( 'context' )
        .service( 'Context', function ( ) {
            var data = {
                appTitle: null,
                bSideBarVisible: false
            };

            function setAppTitle ( title ) {
                data.appTitle = title;
            }

            return {
                setAppTitle: setAppTitle,

                // exposed deliberately so we can bind to the values
                data: data
            };
        });
})();

