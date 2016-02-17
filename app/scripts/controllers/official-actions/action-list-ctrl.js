teamunApp.controller('OfficialActionListCtrl', ['$scope', '$location', 'OfficialActionService', function($scope, $location, OfficialActionService) {

  $scope.removeAction = function(action) {
    if (confirm("确认删除该动态吗？")) {
      OfficialActionService.removeOfficialAction.remove({
        action_id: action._id
      }, function(response) {
        $scope.list.data.actions.splice($scope.list.data.actions.indexOf(action), 1);
      });
    }
  };

}]);
