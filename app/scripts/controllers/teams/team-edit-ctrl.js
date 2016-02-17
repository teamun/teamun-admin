teamunApp.controller('TeamEditCtrl', ['$scope', '$location', '$state', '$stateParams', 'toaster', '$timeout', 'Upload', 'TeamService', 'EventService', 'UserService', 'DEFAULT_DOMAIN', function($scope, $location, $state, $stateParams, toaster, $timeout, Upload, TeamService, EventService, UserService, DEFAULT_DOMAIN) {

  EventService.eventList.get({}, function(result) {
    $scope.eventList = result.data;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  UserService.userList.get({}, function(result) {
    $scope.userList = result.data;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  TeamService.team.get({team_id: $stateParams.team_id}, function(result) {
    $scope.team = result.data.team[0];
    $scope.logo = result.data.team[0].logo;

  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  $scope.updateTeam = function(team) {
    team.logo = $scope.logo;
    TeamService.updateTeam.update({team_id: $stateParams.team_id}, $.param(team), function(data) {
      $location.path('/admin/team-detail/' + $stateParams.team_id);
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });

  };

  /**
   * 上传接口
   */
  $scope.$watch('files', function() {
    $scope.upload($scope.files);
  });
  $scope.progress = '';
  $scope.logo = '';
  $scope.upload = function(files) {
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        Upload.upload({
          url: DEFAULT_DOMAIN + '/upload',
          method: 'POST',
          file: file
        }).progress(function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.progress = progressPercentage;
        }).success(function(data, status, headers, config) {
          $timeout(function() {
            $scope.logo = '';
            $scope.logo = data.imgurl;
            // $scope.uploadLog = 'file: ' + config.fiposterle.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.uploadLog;
          });
        });
      }
    }
  };
}]);
