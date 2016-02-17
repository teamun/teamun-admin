teamunApp.controller('MenuEditCtrl', ['$scope', '$state', '$stateParams', '$location', 'toaster', 'MenuService', function($scope, $state, $stateParams, $location, toaster, MenuService) {

  MenuService.parentList.get({}, function(result) {
  	if(result.data.parents) {
  		$scope.parentList = result.data.parents;
	    MenuService.menu.get({menu_id: $stateParams.menu_id}, function(result) {
		    $scope.menu = result.data.menu;
		  }, function(error) {
		    toaster.pop('error', error.data.msg);
		  });
  	}
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  $scope.updateMenu = function(menu) {
    MenuService.updateMenu.update({menu_id: $stateParams.menu_id}, $.param(menu), function(result) {
      $state.go('admin.menu-list');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

}]);
