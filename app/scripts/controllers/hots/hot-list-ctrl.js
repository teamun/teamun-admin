teamunApp.controller('HotListCtrl', ['$scope', '$location', 'HotService', function($scope, $location, HotService) {

  $scope.removeHot = function(hot) {
    if (confirm("确认删除该动态吗？")) {
      HotService.removeHot.remove({
        hot_id: hot._id
      }, function(response) {
        $scope.list.data.hots.splice($scope.list.data.hots.indexOf(hot), 1);
      });
    }
  };

}]);
