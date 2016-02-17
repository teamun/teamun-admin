teamunApp.controller('UserDetailCtrl', ['$scope', '$location', '$stateParams', 'toaster', 'UserService', function($scope, $location, $stateParams, toaster, UserService) {

  UserService.user.get({
    user_id: $stateParams.user_id
  }, function(result) {
    $scope.user = result.data.user[0];
    $scope.tags = result.data.user[0].tags;
  }, function(error) {
    toaster.pop('error', error.data.message);
  });

  $scope.addTag = function(tag) {
    UserService.addTag.update({
      user_id: $stateParams.user_id,
      tag: tag
    }, function(response) {
      toaster.pop('success', '添加成功');
      angular.element(document.querySelector('#tagModal')).modal('hide');
      UserService.user.get({
        user_id: $stateParams.user_id
      }, function(result) {
        $scope.tags = result.data.user[0].tags;
      }, function(error) {
        toaster.pop('error', error.data.message);
      });
    });
  };

  $scope.removeTag = function(tag) {
    if (confirm("确认删除该分组吗？")) {
      UserService.removeTag.update({
        user_id: $stateParams.user_id,
        tag: tag
      }, function(response) {
        toaster.pop('success', '删除成功');
        UserService.user.get({
          user_id: $stateParams.user_id
        }, function(result) {
          $scope.tags = result.data.user[0].tags;
        }, function(error) {
          toaster.pop('error', error.data.message);
        });
      });
    }
  };

}]);
