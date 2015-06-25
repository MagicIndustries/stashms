(function () {
    'use strict';
    angular.module( 'pubsub' )
        .service( 'PubSub', function ( lodash ) {

            var channels = {};
            var subUID = -1;

            /**
             * Subscribes a function to a given channel
             *
             * If the once parameter is true, creates a single use subscription
             * that gets deleted after the first message is received.
             *
             * @param {string} channel      Channel name to subscribe to
             * @param {function} listener   Callback function
             * @param {boolean} once        Whether to make it a single use subscription
             * @returns {number}            Unique ID of the subscriptoin
             */
            function subscribe( channel, listener, once ) {
                // check that the listener is a function
                if ( typeof listener !== 'function' ) {
                    throw new Error( 'Listener must be a function' );
                }

                // generate a uniqueID
                var uid = ( subUID += 1 );
                // create the subscription object
                var obj = {
                    uid:      uid,
                    listener: listener,
                    once:     once || false // default to permanent subscription if "once" is not specified
                };

                // if we don't already have the channel...
                if ( !channels[ channel ] ) {
                    // add the new channel
                    channels[ channel ] = [];
                }

                // record the subscription
                channels[ channel ].push( obj );

                // pass back the uniqueID
                return uid;
            }

            /**
             * Removes a subscription based on the unique ID supplied
             *
             * @param {string} subscriptionID   Unique ID of the subscription
             * @returns {boolean}
             */
            function unsubscribe( subscriptionID ) {
                // if no subscriptionID was provided...
                if ( typeof subscriptionID === 'undefined' ) {
                    return false;
                }
                // loop over the channels
                lodash.each( channels, function ( channel, channelName ) {
                    // loop over the subscriptions in this channel
                    for ( var n = 0; n < channel.length; n += 1 ) {
                        // if we've found the subscription we're looking for...
                        if ( channel[ n ].uid === subscriptionID ) {
                            // remove the subscription
                            channels[ channelName ].splice( n, 1 );
                        }
                    }
                } );
            }

            /**
             * Removes all subscriptions on the named channel
             *
             * @param {string} channel
             * @returns {boolean}
             */
            function unsubscribeChannel( channel ) {
                // if we don't have the channel...
                if ( !channels[ channel ] ) {
                    return false;
                }
                channels[ channel ] = [];
                return true;
            }

            /**
             * Publishes a message to all subscriber functions on the named channel
             *
             * @param {string} channel
             * @param {string|object} msg
             * @returns {boolean}
             */
            function publish( channel, msg ) {
                // DEBUG: remove this
                console.log( 'blah1' );
                // if we can't find the channel...
                if ( !channels[ channel ] ) {
                    return false;
                }
// DEBUG: remove this
console.log( 'blah2' );
                // loop over the subscribers
                lodash.each( channels[ channel ], function ( thisSubscription ) {
                    // publish the message to the current subscriber
                    thisSubscription.listener( msg );

                    // if this subscription is a once off...
                    if ( thisSubscription.once ) {
                        unsubscribe( thisSubscription.uid );
                    }
                } );

                return true;
            }

            return {
                subscribe:          subscribe,
                subscribeOnce:      function ( channel, listener ) {
                    subscribe( channel, listener, true );
                },
                unsubscribe:        unsubscribe,
                unsubscribeChannel: unsubscribeChannel,
                publish:            publish
            };
        });
})();

