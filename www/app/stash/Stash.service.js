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
          // DEBUG: remove this
          console.log( msgData );
        }

        return {
            start: start,
            list: list,
            getMessage: getMessage,
            text: text,
            data: data
        }
})