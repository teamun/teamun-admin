'use strict';
/**
 * @ngdoc overview
 * @name teamunApp
 * @description
 * #
 * 队部JS库依赖以及程序路由主配置文件
 */
var teamunApp = angular.module('teamunApp', [
  'ngAnimate',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ui.router',
  'ngResource',
  'textAngular',
  'angular-md5',
  'ngFileUpload',
  'bgf.paginateAnything',
  'toaster',
  'angular-loading-bar',
  'checklist-model',
  'angularQFileUpload',
  'LocalStorageModule'
]);

teamunApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        views: {
          '': {
            templateUrl: 'views/template.html'
          },
          'sidebar': {
            templateUrl: 'views/sidebar/sidebar.html',
            controller: 'SideBarCtrl',
            controllerUrl: 'scripts/controller/sidebar/sidebar-ctrl'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          'login': {
            templateUrl: 'views/admin/login.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/admin/login-ctrl'
          }
        }
      })
      .state('admin.dashboard', {
        url: '/dashboard',
        views: {
          '': {
            templateUrl: 'views/dashboards/dashboard.html',
            controller: 'DashboardCtrl',
            controllerUrl: 'scripts/controller/dashboards/dashboard-ctrl',
            access: {
              requiredLogin: true
            }
          }
        }
      })
      /*------------------------------------------  menus  -----------------------------------------------*/
      .state('admin.menu-list', {
        url: '/menu-list',
        views: {
          '': {
            templateUrl: 'views/menus/menu-list.html',
            controller: 'MenuListCtrl',
            controllerUrl: 'scripts/controller/menus/menu-list-ctrl'
          }
        }
      })
      .state('admin.menu-add', {
        url: '/menu-add',
        views: {
          '': {
            templateUrl: 'views/menus/menu-add.html',
            controller: 'MenuAddCtrl',
            controllerUrl: 'scripts/controller/menus/menu-add-ctrl'
          }
        }
      })
      .state('admin.menu-edit', {
        url: '/menu-edit/:menu_id',
        views: {
          '': {
            templateUrl: 'views/menus/menu-edit.html',
            controller: 'MenuEditCtrl',
            controllerUrl: 'scripts/controller/menus/menu-edit-ctrl'
          }
        }
      })
      /*------------------------------------------  users & admins  -----------------------------------------------*/
      .state('admin.user-list', {
        url: '/user-list',
        views: {
          '': {
            templateUrl: 'views/users/user-list.html'
          }
        }
      })
      .state('admin.user-add', {
        url: '/user-add',
        views: {
          '': {
            templateUrl: 'views/users/user-add.html',
            controller: 'UserAddCtrl',
            controllerUrl: 'scripts/controller/users/user-add-ctrl'
          }
        }
      })
      .state('admin.user-detail', {
        url: '/user-detail/:user_id',
        views: {
          '': {
            templateUrl: 'views/users/user-detail.html',
            controller: 'UserDetailCtrl',
            controllerUrl: 'scripts/controller/users/user-detail-ctrl'
          }
        }
      })
      .state('admin.user-edit', {
        url: '/user-edit/:user_id',
        views: {
          '': {
            templateUrl: 'views/users/user-edit.html',
            controller: 'UserEditCtrl',
            controllerUrl: 'scripts/controller/users/user-edit-ctrl'
          }
        }
      })
      .state('admin.admin-add', {
        url: '/admin-add',
        views: {
          '': {
            templateUrl: 'views/users/admin-add.html',
            controller: 'UserAddCtrl',
            controllerUrl: 'scripts/controller/users/user-add-ctrl'
          }
        }
      })
      .state('admin.admin-list', {
        url: '/admin-list',
        views: {
          '': {
            templateUrl: 'views/users/admin-list.html'
          }
        }
      })
      .state('admin.admin-detail', {
        url: '/admin-detail/:user_id',
        views: {
          '': {
            templateUrl: 'views/users/admin-detail.html',
            controller: 'UserDetailCtrl',
            controllerUrl: 'scripts/controller/users/user-detail-ctrl'
          }
        }
      })
      .state('admin.admin-edit', {
        url: '/admin-edit/:user_id',
        views: {
          '': {
            templateUrl: 'views/users/admin-edit.html',
            controller: 'UserEditCtrl',
            controllerUrl: 'scripts/controller/users/user-edit-ctrl'
          }
        }
      })
      /*------------------------------------------  events  -----------------------------------------------*/
      .state('admin.event-list', {
        url: '/event-list',
        views: {
          '': {
            templateUrl: 'views/events/event-list.html',
            controller: 'EventListCtrl',
            controllerUrl: 'scripts/controller/events/event-list-ctrl'
          }
        }
      })
      .state('admin.event-add', {
        url: '/event-add',
        views: {
          '': {
            templateUrl: 'views/events/event-add.html',
            controller: 'EventAddCtrl',
            controllerUrl: 'scripts/controller/events/event-add-ctrl'
          }
        }
      })
      .state('admin.event-edit', {
        url: '/event-edit/:event_id',
        views: {
          '': {
            templateUrl: 'views/events/event-edit.html',
            controller: 'EventEditCtrl',
            controllerUrl: 'scripts/controller/events/event-edit-ctrl'
          }
        }
      })
      /*------------------------------------------  teams  -----------------------------------------------*/
      .state('admin.team-list', {
        url: '/team-list',
        views: {
          '': {
            templateUrl: 'views/teams/team-list.html'
          }
        }
      })
      .state('admin.team-add', {
        url: '/team-add',
        views: {
          '': {
            templateUrl: 'views/teams/team-add.html',
            controller: 'TeamAddCtrl',
            controllerUrl: 'scripts/controller/teams/team-add-ctrl'
          }
        }
      })
      .state('admin.team-detail', {
        url: '/team-detail/:team_id',
        views: {
          '': {
            templateUrl: 'views/teams/team-detail.html',
            controller: 'TeamDetailCtrl',
            controllerUrl: 'scripts/controller/teams/team-detail-ctrl'
          }
        }
      })
      .state('admin.team-edit', {
        url: '/team-edit/:team_id',
        views: {
          '': {
            templateUrl: 'views/teams/team-edit.html',
            controller: 'TeamEditCtrl',
            controllerUrl: 'scripts/controller/teams/team-edit-ctrl'
          }
        }
      })
      /*------------------------------------------  activities  -----------------------------------------------*/
      .state('admin.activity-list', {
        url: '/activity-list',
        views: {
          '': {
            templateUrl: 'views/activities/activity-list.html',
            controller: 'ActivityListCtrl',
            controllerUrl: 'scripts/controller/activities/activity-list-ctrl'
          }
        }
      })
      .state('admin.activity-add', {
        url: '/activity-add',
        views: {
          '': {
            templateUrl: 'views/activities/activity-add.html',
            controller: 'ActivityAddCtrl',
            controllerUrl: 'scripts/controller/activities/activity-add-ctrl'
          }
        }
      })
      .state('admin.activity-add-next-step', {
        url: '/activity-add-next-step/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-add-next-step.html',
            controller: 'ActivityAddNextStepCtrl',
            controllerUrl: 'scripts/controller/activities/activity-add-next-step-ctrl'
          }
        }
      })
      .state('admin.activity-detail', {
        url: '/activity-detail/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-detail.html',
            controller: 'ActivityDetailCtrl',
            controllerUrl: 'scripts/controller/activities/activity-detail-ctrl'
          }
        }
      })
      .state('admin.activity-edit', {
        url: '/activity-edit/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-edit.html',
            controller: 'ActivityEditCtrl',
            controllerUrl: 'scripts/controller/activities/activity-edit-ctrl'
          }
        }
      })
      .state('admin.activity-group-members', {
        url: '/activity-group-members/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-group-members.html',
            controller: 'ActivityGroupMembersCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-group-members-ctrl'
          }
        }
      })



      /*------------------------------------------  official site  -----------------------------------------------*/
      .state('admin.team-recommend-list', {
        url: '/team-recommend-list',
        views: {
          '': {
            templateUrl: 'views/teams/team-recommend-list.html',
            controller: 'TeamRecommendListCtrl',
            controllerUrl: 'scripts/controller/teams/team-recommend-list-ctrl'
          }
        }
      })
      .state('admin.activity-recommend-list', {
        url: '/activity-recommend-list',
        views: {
          '': {
            templateUrl: 'views/activities/activity-recommend-list.html',
            controller: 'ActivityRecommendListCtrl',
            controllerUrl: 'scripts/controller/activities/activity-recommend-list-ctrl'
          }
        }
      })
      .state('admin.official-action-list', {
        url: '/official-action-list',
        views: {
          '': {
            templateUrl: 'views/official-actions/action-list.html',
            controller: 'OfficialActionListCtrl',
            controllerUrl: 'scripts/controller/official-actions/action-list-ctrl'
          }
        }
      })
      .state('admin.official-action-add', {
        url: '/official-action-add',
        views: {
          '': {
            templateUrl: 'views/official-actions/action-add.html',
            controller: 'OfficialActionAddCtrl',
            controllerUrl: 'scripts/controller/official-actions/action-add-ctrl'
          }
        }
      })
      .state('admin.official-action-detail', {
        url: '/official-action-detail/:action_id',
        views: {
          '': {
            templateUrl: 'views/official-actions/action-detail.html',
            controller: 'OfficialActionDetailCtrl',
            controllerUrl: 'scripts/controller/official-actions/action-detail-ctrl'
          }
        }
      })
      .state('admin.official-action-edit', {
        url: '/official-action-edit/:action_id',
        views: {
          '': {
            templateUrl: 'views/official-actions/action-edit.html',
            controller: 'OfficialActionEditCtrl',
            controllerUrl: 'scripts/controller/official-actions/action-edit-ctrl'
          }
        }
      })
      /*------------------------------------------  wecaht-activities  -----------------------------------------------*/
      .state('admin.wechat-activity-list', {
        url: '/wechat-activity-list',
        views: {
          '': {
            templateUrl: 'views/wechat-activities/wechat-activity-list.html',
            controller: 'WechatActivityListCtrl',
            controllerUrl: 'scripts/controller/wechat-activities/wechat-activity-list-ctrl'
          }
        }
      })
      .state('admin.wechat-activity-detail', {
        url: '/wechat-activity-detail/:activity_id',
        views: {
          '': {
            templateUrl: 'views/wechat-activities/wechat-activity-detail.html',
            controller: 'WechatActivityDetailCtrl',
            controllerUrl: 'scripts/controller/wechat-activities/wechat-activity-detail-ctrl'
          }
        }
      })
      /*------------------------------------------  organizers  -----------------------------------------------*/
      .state('admin.organizer-list', {
        url: '/organizer-list',
        views: {
          '': {
            templateUrl: 'views/organizers/organizer-list.html',
            controller: 'OrganizerListCtrl',
            controllerUrl: 'scripts/controller/organizers/organizer-list-ctrl'
          }
        }
      })
      .state('admin.organizer-add', {
        url: '/organizer-add',
        views: {
          '': {
            templateUrl: 'views/organizers/organizer-add.html',
            controller: 'OrganizerAddCtrl',
            controllerUrl: 'scripts/controller/organizers/organizer-add-ctrl'
          }
        }
      })
      .state('admin.organizer-edit', {
        url: '/organizer-edit/:organizer_id',
        views: {
          '': {
            templateUrl: 'views/organizers/organizer-edit.html',
            controller: 'OrganizerEditCtrl',
            controllerUrl: 'scripts/controller/organizers/organizer-edit-ctrl'
          }
        }
      })
      /*------------------------------------------  hot  -----------------------------------------------*/
      .state('admin.hot-list', {
        url: '/hot-list',
        views: {
          '': {
            templateUrl: 'views/hots/hot-list.html',
            controller: 'HotListCtrl',
            controllerUrl: 'scripts/controller/hots/hot-list-ctrl'
          }
        }
      })
      .state('admin.hot-add', {
        url: '/hot-add',
        views: {
          '': {
            templateUrl: 'views/hots/hot-add.html',
            controller: 'HotAddCtrl',
            controllerUrl: 'scripts/controller/hots/hot-add-ctrl'
          }
        }
      })
      .state('admin.hot-detail', {
        url: '/hot-detail/:hot_id',
        views: {
          '': {
            templateUrl: 'views/hots/hot-detail.html',
            controller: 'HotDetailCtrl',
            controllerUrl: 'scripts/controller/hots/hot-detail-ctrl'
          }
        }
      })
      .state('admin.hot-edit', {
        url: '/hot-edit/:hot_id',
        views: {
          '': {
            templateUrl: 'views/hots/hot-edit.html',
            controller: 'HotEditCtrl',
            controllerUrl: 'scripts/controller/hots/hot-edit-ctrl'
          }
        }
      })
      ;

    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

  }]);

teamunApp.config(function($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptorService');
});

teamunApp.constant('DEFAULT_DOMAIN', '/api');

teamunApp.filter('nl2br', function($sce){
  return function(msg,is_xhtml) { 
    var is_xhtml = is_xhtml || true;
    var breakTag = (is_xhtml) ? '<br />' : '<br>';
    var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    return $sce.trustAsHtml(msg);
  }
});

teamunApp.run(function($rootScope, $location, $window, $http, $state, AuthenticationService, DEFAULT_DOMAIN) {

  $rootScope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
    //redirect only if both isLogged is false and no token is set
    if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredLogin && !AuthenticationService.isLogged && !$window.sessionStorage.token) {
      $location.path("/login");
    }
  });

  // Array 在IE8下没有indexOf 方法。
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
      for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  }


  // $rootScope.$on('$stateChangeStart', function() {
  //       var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/admin/checkSeesion');
  //       $checkSessionServer.then(function(response) {
  //           if (response.data.ret == 1) {
  //             $rootScope.systemTime = response.data.data.time;
  //             $rootScope.isLogin = true;
  //           } else {
  //             $location.path('/login');
  //           }
  //     });
  // });
});
