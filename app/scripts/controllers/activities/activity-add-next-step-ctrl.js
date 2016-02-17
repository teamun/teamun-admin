teamunApp.controller('ActivityAddNextStepCtrl', ['$scope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'ActivityService', function($scope, $state, $stateParams, $location, toaster, $timeout, ActivityService) {

  ActivityService.activity.get({activity_id: $stateParams.activity_id}, function(result) {
    $scope.activity = result.data.activity;
    $scope.activityStatusMap = result.data.activityStatusMap;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  ActivityService.activityGroups.get({activity_id: $stateParams.activity_id}, function(result) {
    $scope.activityGroups = result.data.activityGroups;
    $scope.activityGroupStatusMap = result.data.statusMap;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  $scope.saveActivityGroup = function(activityGroup) {
    var signTime = $scope.signTime ? $scope.signTime.getTime() : '';
    var deadlineTime = $scope.deadlineTime ? $scope.deadlineTime.getTime() : '';

    activityGroup.signTime = signTime;
    activityGroup.deadlineTime = deadlineTime;
    activityGroup.activity = $scope.activity._id;

    ActivityService.saveActivityGroup.save($.param(activityGroup), function(result) {;

      angular.element(document.querySelector('#activityGroupModal')).modal('hide');
      $timeout(goActivityGroup, 500);

    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  function goActivityGroup() {
    $state.go($state.current, {}, {
      reload: true
    });
  }

  $scope.editGroup = function(activityGroupID) {
    ActivityService.activityGroupForEdit.get({activity_group_id: activityGroupID}, function(result) {
      $scope.activityGroup = result.data.activityGroup;
      $scope.signTime = result.data.activityGroup.signTime;
      $scope.deadlineTime = result.data.activityGroup.deadlineTime;
      angular.element(document.querySelector('#updateActivityGroupModal')).modal('show');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  $scope.updateActivityGroup = function(activityGroup) {

    activityGroup.signTime = $scope.signTime ? new Date($scope.signTime).getTime().toString() : '';
    activityGroup.deadlineTime = $scope.deadlineTime ? new Date($scope.deadlineTime).getTime().toString() : '';
    activityGroup.activity = $scope.activity._id;

    ActivityService.updateActivityGroup.update({activity_group_id: activityGroup._id}, $.param(activityGroup), function(result) {
      angular.element(document.querySelector('#updateActivityGroupModal')).modal('hide');
      toaster.pop('success', '更新成功');
      $timeout(goActivityGroup, 500);

    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };


  $scope.removeGroup = function(group) {
  	if (confirm("确认删除该分组吗？")) {
      ActivityService.removeActivityGroup.remove({
        activity_group_id: group._id
      }, function(response) {
      	toaster.pop('success', '删除成功');
        $scope.activityGroups.splice($scope.activityGroups.indexOf(group), 1);
      });
    }
  };
  
  
  $scope.publishGroup = function(activity) {
    ActivityService.publishActivity.update({activity_id: activity._id}, function(result) {
      $state.go($state.current, {}, {
	      reload: true
	    });
      toaster.pop('success', '发布成功');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

}]);
