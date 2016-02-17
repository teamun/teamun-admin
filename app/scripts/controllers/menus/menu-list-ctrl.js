teamunApp.controller('MenuListCtrl', ['$scope', '$location', 'toaster', 'MenuService', function($scope, $location, toaster, MenuService) {

  MenuService.menuList.get({}, function(result) {
    $scope.menuList = result.data.menus;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  $scope.removeMenu = function(menu) {
    if (confirm("确认删除该菜单吗？")) {
      MenuService.removeMenu.remove({
        menu_id: menu._id
      }, function(response) {
        $scope.menuList.splice($scope.menuList.indexOf(menu), 1);
      });
    }
  };

}]);
