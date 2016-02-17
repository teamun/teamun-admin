teamunApp.controller('WechatActivityListCtrl', ['$scope', '$stateParams', '$location', function($scope, $stateParams, $location) {

  $scope.perPage = parseInt($location.search().perPage, 10) || 10;
  $scope.page = parseInt($location.search().page, 10) || 0;
  $scope.clientLimit = 250;
  $scope.urlParams = {
    activity_id: $stateParams.activity_id
  };

  $scope.$watch('page', function(page) {
    $location.search('page', page);
  });
  $scope.$watch('perPage', function(page) {
    $location.search('perPage', page);
  });
  $scope.$on('$locationChangeSuccess', function() {
    var page = +$location.search().page,
      perPage = +$location.search().perPage;
    if (page >= 0) {
      $scope.page = page;
    };
    if (perPage >= 0) {
      $scope.perPage = perPage;
    };
  });

}]);
