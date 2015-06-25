angular.module( 'stashpoc', [
    'ionic',
    'ngAria',
    'ngMaterial',
    'ngMaterialDropmenu',
    'globals',
    'auth',
    'header',
    'context',
    'user',
    'stash',
    'message',
    'pubsub',
    'ngLodash',
    'notifications'
] )

    .config( function ( $stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $mdIconProvider ) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj) {
                value = obj[name];

                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
        $httpProvider.interceptors.push( 'AuthHTTPInterceptor' );


        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('teal', {
                'default': '700'
            });

        $mdIconProvider
            .icon('menu', 'img/icons/ic_menu_24px.svg')
            .icon('more', 'img/icons/ic_more_vert_24px.svg')
            .icon('search', 'img/icons/ic_search_24px.svg')
            .icon('add', 'img/icons/ic_add_24px.svg')
            .icon('send', 'img/icons/send.svg')
            .icon('delete', 'img/icons/ic_delete_24px.svg')
            .icon('info', 'img/icons/information-outline.svg')
            .icon('warn', 'img/icons/flag.svg')
            .icon('success', 'img/icons/check.svg')
            .icon('danger', 'img/icons/radioactive.svg')
            .icon('close', 'img/icons/close.svg')
            .icon('fileMsg', 'img/icons/attachment.svg')
            .icon('textMsg', 'img/icons/comment-text-outline.svg');

        $stateProvider
            .state( 'login', {
                url:          '/login',
                authenticate: false,
                views:        {
                    'body@':   {
                        templateUrl: 'app/auth/loginForm.html',
                        controller:  'AuthCtrl as vm'
                    }
                }
            } )
            .state( 'messageList', {
                url:          '/messageList',
                authenticate: true,
                views:        {
                    'body@':   {
                        templateUrl: 'app/message/messageList.html',
                        controller:  'MessageListCtrl as vm'
                    }
                }
            } )
            .state( 'message', {
                url:          '/message/:msgID',
                authenticate: true,
                views:        {
                    'body@':   {
                        templateUrl: 'app/message/message.html',
                        controller:  'MessageViewCtrl as vm'
                    }
                }
            } )
            .state( 'compose', {
                url:          '/compose',
                authenticate: true,
                views:        {
                    'body@':   {
                        templateUrl: 'app/message/compose.html',
                        controller:  'ComposeCtrl as vm'
                    }
                }
            } );

        // default route to login
        $urlRouterProvider.otherwise( '/login' );

    })

    .run( function ( $ionicPlatform, $rootScope, $location, AuthTokenFactory, Auth ) {
        $ionicPlatform.ready( function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if ( window.cordova && window.cordova.plugins.Keyboard ) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
            }
            if ( window.StatusBar ) {
                StatusBar.styleDefault();
            }
        } )

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on( '$stateChangeStart', function ( event, next ) {
            if ( next.authenticate && !AuthTokenFactory.getToken() ) {
                $location.path( 'login' );
                return;
            }
        } );
        // set the loggedIn flag if we detect a token
        if ( AuthTokenFactory.getToken() ) {
            Auth.data.bLoggedIn = true;
        }

    } )

    .controller( 'BaseCtrl', function ( $rootScope, Context, Auth, $state ) {
        var vm = this;
        vm.newMsg = newMsg;
        vm.authData = Auth.data;

        function newMsg () {
            $state.go( 'compose' );
        }

        vm.contextData = Context.data;
        Context.setAppTitle( 'Stash' );
    } );
