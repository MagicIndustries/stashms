(function () {
    'use strict';
    angular.module( 'globals' )
        .service( 'Globals', function () {
            var endPoint = 'http://stash.everchain.com/v1';

            return {
                urls: {
                    start: endPoint + '/session/start',
                    list: endPoint + '/messages/list',
                    getMessage: endPoint + '/messages/{msgID}/get',
                    remove: endPoint + '/messages/{msgID}/remove',
                    text: endPoint + '/messages/send/text'
                },

                times: {
                    notificationTTL: 3000
                }
            }
        })
})();

