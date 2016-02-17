teamunApp.controller('TeamRecommendListCtrl', ['$scope', '$state', '$location', 'toaster', 'TeamService', 'EventService', function($scope, $state, $location, toaster, TeamService, EventService) {

  $scope.recommendRemove = function(teamID) {
    TeamService.recommendRemove.update({
      team_id: teamID
    }, function(data) {
      $state.go('admin.team-list');
    }, function(error) {
      toaster.pop('error', error.data.message);
    });

  };

}]);
