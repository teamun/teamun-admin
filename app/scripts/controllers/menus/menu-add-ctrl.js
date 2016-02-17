teamunApp.controller('MenuAddCtrl', ['$scope', '$state', '$stateParams', 'toaster', '$timeout', 'MenuService', 'DEFAULT_DOMAIN', function($scope, $state, $stateParams, toaster, $timeout, MenuService, DEFAULT_DOMAIN) {

  $scope.saveMenu = function(menu) {
    MenuService.saveMenu.save($.param(menu), function(result) {
      $state.go('admin.menu-list');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  MenuService.parentList.get({}, function(result) {
    $scope.parentList = result.data.parents;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

}]);
