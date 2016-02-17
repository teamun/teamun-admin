teamunApp.controller('WechatActivityDetailCtrl', ['$scope', '$location', '$stateParams', 'toaster', 'WechatActivityService', function ($scope, $location, $stateParams, toaster, WechatActivityService) {
	
	$scope.urlParams = {
	  activity_id: $stateParams.activity_id
	};
	
	WechatActivityService.activity.get({activity_id: $stateParams.activity_id}, function(data) {
		$scope.activity = data.activity;
	}, function(error) {
      toaster.pop('error', error.data.message);
    });

}]);
