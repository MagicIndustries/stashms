angular.module( 'stash' )
.service( 'Stash', function (  $http, AuthTokenFactory ) {

    var data = {
        currentMsg: null
    };


        function start ( credentials ) {
          return $http.post('http://stash.everchain.com/v1/session/start', credentials).then( function ( response ) {
            return response;
          })
        }

        function list ( ) {
          return $http.get('http://stash.everchain.com/v1/messages/list' ).then( function ( response ) {
            return JSON.parse(response.data.RESULTS);
          });
        }

        function getMessage ( msgID ) {
            return $http.get('http://stash.everchain.com/v1/messages/' + msgID + '/get' ).then( function ( response ) {
                data.currentMsg = response.data;
                // DEBUG: remove this
                console.log( 'the msg: ', response );
              return response;
            }, function ( err ) {
              // DEBUG: remove this
              console.log( err );
            })
        }

        function text ( msgData ) {
            return $http.post( 'http://stash.everchain.com/v1/messages/send/text', {
                message_type: 1,
                strength: 3,
                recipientEmail: msgData.recipient,
                message: msgData.msg
            } ).then( function ( response ) {
              //TODO: pubsub message and handle error
                return response;
            });
        }

        function remove ( msgID ) {
            return $http.post( 'http://stash.everchain.com/v1/messages/' + msgID + '/remove', {
                messageId: msgID
            } ).then( function ( response ) {
              return response;
                //TODO: pubsub message and handle error
            })
        }

        return {
            start: start,
            list: list,
            getMessage: getMessage,
            text: text,
            remove: remove,
            data: data
        }
})