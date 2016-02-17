teamunApp.controller('UserCtrl', ['$scope', '$location', 'toaster', 'UserService', function ($scope, $location, toaster, UserService) {
	
	// UserService.findList.get({},function(data) {
	// 	$scope.userList = data;
	// }, function(error) {
 //      toaster.pop('error', error.data.message);
 //    });

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
