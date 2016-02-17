teamunApp.controller('OrganizerListCtrl', ['$scope', '$location', 'toaster', 'OrganizerService', function($scope, $location, toaster, OrganizerService) {

  $scope.removeOrganizer = function(organizer) {
    if (confirm("确认删除该项目吗？")) {
      OrganizerService.removeOrganizer.remove({
        organizer_id: organizer._id
      }, function(response) {
        $scope.list.data.organizers.splice($scope.list.data.organizers.indexOf(organizer), 1);
      });
    }
  };

}]);
