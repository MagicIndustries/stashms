(function () {
    'use strict';

    angular.module( 'stash' )
    .service( 'Stash', function (  $http, AuthTokenFactory, Globals, PubSub ) {

        var data = {
            currentMsg: null
        };

        function start ( credentials ) {
          return $http.post( Globals.urls.start, credentials).then( function ( response ) {
            return response;
          }, function ( err ) {
              PubSub.publish( 'notifications', {
                  type: 'danger',
                  msg: 'An Error has occurred - could not establish a secure session',
                  err: err
              });
          });
        }

        function list ( ) {
          return $http.get( Globals.urls.list ).then( function ( response ) {
            return JSON.parse(response.data.RESULTS);
          }, function ( err ) {
              PubSub.publish( 'notifications', {
                  type: 'danger',
                  msg: 'An Error has occurred while attempting to retrieve your message list',
                  detail: err.data.MESSAGE,
                  err: err
              });
          });
        }

        function getMessage ( msgID ) {
            return $http.get(interpolateURL( Globals.urls.getMessage, msgID ) ).then( function ( response ) {
              return response.data;
            }, function ( err ) {
                PubSub.publish( 'notifications', {
                    type: 'danger',
                    msg: 'An Error has occurred',
                    detail: err.data.MESSAGE,
                    err: err
                });
                // DEBUG: remove this
                console.log( err );
            })
        }

        function text ( msgData ) {
            return $http.post( Globals.urls.text, {
                message_type: 1,
                strength: 3,
                recipientEmail: msgData.recipient,
                message: msgData.msg
            } ).then( function ( response ) {
                PubSub.publish( 'notifications', {
                    type: 'success',
                    msg: 'Message sent successfully'
                });
                return response;
            }, function ( err ) {
                PubSub.publish( 'notifications', {
                    type: 'danger',
                    msg: 'An Error has occurred while attempting to retrieve your message',
                    err: err
                });
            });
        }

        function remove ( msgID ) {
            return $http.post( interpolateURL( Globals.urls.remove, msgID ), {
                messageId: msgID
            } ).then( function ( response ) {
              return response;
                PubSub.publish( 'notifications', {
                    type: 'success',
                    msg: 'Message successfully deleted'
                });
            }, function ( err ) {
                PubSub.publish( 'notifications', {
                    type: 'danger',
                    msg: 'An Error has occurred while attempting to delete your message',
                    err: err
                });
            })
        }

        function interpolateURL( url, msgID ) {
            return url.replace( /\{msgID\}/g, msgID);
        }

        return {
            start: start,
            list: list,
            getMessage: getMessage,
            text: text,
            remove: remove,
            data: data
        }
    });
})();