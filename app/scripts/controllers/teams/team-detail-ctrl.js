teamunApp.controller('TeamDetailCtrl', ['$scope', '$stateParams', '$location', 'toaster', 'TeamService', function($scope, $stateParams, $location, toaster, TeamService) {

  TeamService.team.get({team_id: $stateParams.team_id}, function(result) {
    $scope.team = result.data.team[0];
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

}]);
