teamunApp.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'LoginService', 'AuthenticationService', 'toaster', function($scope, $rootScope, $state, LoginService, AuthenticationService, toaster) {

  $scope.login = function(user) {
    LoginService.login.save($.param(user), function(result) {
      if (result.ret === 1) {
        AuthenticationService.isLogged = true;
        localStorage.token = result.token;
        $state.go('admin.dashboard');
        toaster.pop('success', '登陆成功');
      } else {
        toaster.pop('error', '提示', result.msg);
      }
    }, function(error) {
      toaster.pop('error', error.data.message);
    });
  }

  $scope.logout = function() {
    // SessionService.destory('user');
    if (AuthenticationService.isLogged) {
      AuthenticationService.isLogged = false;
      delete localStorage.token;
      $location.path('/login');
    }
  }

  $scope.islogged = function() {
    // if (SessionService.get('user')) return true;
    if (AuthenticationService.isLogged) return true;
  }
}]);
