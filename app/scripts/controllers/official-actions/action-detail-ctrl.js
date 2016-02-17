teamunApp.controller('OfficialActionDetailCtrl', ['$scope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'OfficialActionService', function($scope, $state, $stateParams, $location, toaster, $timeout, OfficialActionService) {

  OfficialActionService.action.get({action_id: $stateParams.action_id}, function(result) {
    $scope.action = result.data.action;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  OfficialActionService.recruitGroups.get({action_id: $stateParams.action_id}, function(result) {
    $scope.recruitGroups = result.data.recruitGroups;
    $scope.recruitGroupStatusMap = result.data.statusMap;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

   $scope.saveRecruitGroup = function(recruitGroup) {
    var signTime = $scope.signTime ? $scope.signTime.getTime() : '';
    var deadlineTime = $scope.deadlineTime ? $scope.deadlineTime.getTime() : '';

    recruitGroup.signTime = signTime;
    recruitGroup.deadlineTime = deadlineTime;
    recruitGroup.officialAction = $scope.action._id;

    OfficialActionService.saveRecruitGroup.save($.param(recruitGroup), function(result) {;

      angular.element(document.querySelector('#recruitGroupModal')).modal('hide');
      $timeout(goRecruitGroup, 500);

    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  function goRecruitGroup() {
    $state.go($state.current, {}, {
      reload: true
    });
  }

  $scope.editGroup = function(recruitGroupID) {
    OfficialActionService.recruitGroupForEdit.get({recruit_group_id: recruitGroupID}, function(result) {
      $scope.recruitGroup = result.data.recruitGroup;
      $scope.signTime = result.data.recruitGroup.signTime;
      $scope.deadlineTime = result.data.recruitGroup.deadlineTime;
      angular.element(document.querySelector('#updateRecruitGroupModal')).modal('show');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  $scope.updateRecruitGroup = function(recruitGroup) {

    recruitGroup.signTime = $scope.signTime ? new Date($scope.signTime).getTime().toString() : '';
    recruitGroup.deadlineTime = $scope.deadlineTime ? new Date($scope.deadlineTime).getTime().toString() : '';
    recruitGroup.officialAction = $scope.action._id;

    OfficialActionService.updateRecruitGroup.update({recruit_group_id: recruitGroup._id}, $.param(recruitGroup), function(result) {
      angular.element(document.querySelector('#updateRecruitGroupModal')).modal('hide');
      toaster.pop('success', '更新成功');
      $timeout(goRecruitGroup, 500);

    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };


  $scope.removeGroup = function(group) {
  	if (confirm("确认删除该分组吗？")) {
      OfficialActionService.removeRecruitGroup.remove({
        recruit_group_id: group._id
      }, function(response) {
      	toaster.pop('success', '删除成功');
        $scope.recruitGroups.splice($scope.recruitGroups.indexOf(group), 1);
      });
    }
  };


  $scope.publishGroup = function(action) {
    OfficialActionService.publishOfficialAction.update({action_id: action._id}, function(result) {
      $state.go($state.current, {}, {
	      reload: true
	    });
      toaster.pop('success', '发布成功');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

}]);
