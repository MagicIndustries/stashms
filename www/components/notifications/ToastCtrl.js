/**
 * Controller for Toast messages
 *
 * Created By:          Toby Tremayne <toby@magicindustries.net>
 * Created On:          ${DATE}
 * ComponentID:
 * Last Updated:        $LastChangedDate$
 * Last Updated By:     $LastChangedBy$
 * Revision:            $LastChangedRevision$
 *
 **/
(function () {
    'use strict';
    angular.module( 'notifications' )

        .controller( 'ToastCtrl', function ( $scope, $mdToast, msg ) {
            $scope.msg = msg;
            $scope.closeToast = function () {
                $mdToast.hide();
            };
        });

})();