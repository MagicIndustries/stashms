/**
 * Directive used to display user notifications
 *
 * Subscribes to the PubSub channel 'notifications' and displays all messages according to type,
 * using the angular-growl-v2 module.
 *
 */

(function () {
    'use strict';

    angular.module( 'notifications' )
        .directive( 'notifications', function ( $mdToast, PubSub, Globals ) {
            return {
                replace: false,
                restrict: 'A',
                link: function ( scope, element, attrs ) {
                    // toast config
                    scope.toastPosition = {
                        bottom: true,
                        top: false,
                        left: false,
                        right: true
                    };
                    // DEBUG: remove this
                    console.log( 'notifications' );

                    // construct the listener
                    scope.listener = function ( msg ) {
                        // if we don't have a type...
                        if ( !msg.hasOwnProperty( 'type' ) ) {
                            msg.type = 'success';
                        }
                        var tmpDetail;
                        if ( msg.detail && msg.detail.length > 105) {
                            tmpDetail = msg.detail.substr(0, 105) + '...';
                        }
                        // default the detail
                        msg.detail = tmpDetail || '';

                        // set the icon and hide delay based on the message type
                        var hideDelay = Globals.times.notificationTTL;
                        switch( msg.type ) {
                            case 'success':
                                msg.icon = 'success';
                                msg.iconColor = '#00FF30';
                                break;
                            case 'info':
                                msg.icon = 'info';
                                msg.iconColor = '#FFFFFF';
                                break;
                            case 'warn':
                                msg.icon = 'warn';
                                msg.iconColor = 'yellow';
                                break;
                            default:
                                msg.icon = 'danger';
                                msg.iconColor = 'red';
                                break;
                        }
                        if ( msg.type === 'danger' ) {
                            hideDelay = 0;
                        }

                        // launch the toast
                        $mdToast.show( {
                            controller: 'ToastCtrl',
                            templateUrl: 'components/notifications/toast-template.html',
                            hideDelay: hideDelay,
                            position: scope.getToastPosition(),
                            locals: { msg: msg }
                        });
                    };

                    scope.getToastPosition = function() {
                        return Object.keys(scope.toastPosition)
                            .filter(function(pos) { return scope.toastPosition[pos]; })
                            .join(' ');
                    };

                    // subscribe to notifications
                    PubSub.subscribe( 'notifications', scope.listener );
                }
            };
        });
})();