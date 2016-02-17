teamunApp.controller('SideBarCtrl', ['$scope', '$location', 'toaster', 'MenuService', function($scope, $location, toaster, MenuService) {

  MenuService.ownedParentsList.get({}, function(result) {
    if (result.data.parents) {
      $scope.parentList = result.data.parents
      MenuService.childList.get({}, function(result) {
        $scope.childList = result.data.children;
      }, function(error) {
        toaster.pop('error', error.data.msg);
      });
    }
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

}]);
