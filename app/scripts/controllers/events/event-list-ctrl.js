teamunApp.controller('EventListCtrl', ['$scope', '$location', 'toaster', 'EventService', function($scope, $location, toaster, EventService) {

  // EventService.eventList.get({}, function(data) {
  //   $scope.eventList = data;
  // }, function(error) {
  //   toaster.pop('error', error.data.message);
  // });

  $scope.removeEvent = function(event) {
    if (confirm("确认删除该项目吗？")) {
      EventService.removeEvent.remove({
        event_id: event._id
      }, function(response) {
        $scope.list.data.events.splice($scope.list.data.events.indexOf(event), 1);
      });
    }
  };

  // $scope.deleteAdmin = function(adminDetail){
  // 	if(confirm("确认删除吗?")) {
  // 		AdminService.deleteAdmin.remove({ adminId:adminDetail.admin.id }, function(response){
  // 			if (response.ret == 1){
  // 				$scope.adminDetailList.splice($scope.adminDetailList.indexOf(adminDetail), 1);
  // 			} else {
  // 				alert('删除管理员出错，错误信息：' + response.msg);
  // 			}

  // 		})
  // 	}
  // };
  // $scope.updateAdminPassword = function(adminDetail){
  // 	if(confirm("确认重置密码么?")) {
  // 		AdminService.updateAdminPassword.update({ adminId:adminDetail.admin.id }, function(response){
  // 			if (response.ret == 1){
  // 				alert('重置成功');
  // 			} else {
  // 				alert('重置出错，错误信息：' + response.msg);
  // 			}

  // 		})
  // 	}
  // };
}]);
