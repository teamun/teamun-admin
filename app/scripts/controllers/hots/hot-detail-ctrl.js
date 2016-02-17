teamunApp.controller('HotDetailCtrl', ['$scope', '$stateParams', '$location', 'toaster', 'HotService', function($scope, $stateParams, $location, toaster, HotService) {

  HotService.hot.get({hot_id: $stateParams.hot_id}, function(result) {
    $scope.hot = result.data.hot;
    $scope.hotCategoryMap = result.data.hotCategoryMap;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

}]);
