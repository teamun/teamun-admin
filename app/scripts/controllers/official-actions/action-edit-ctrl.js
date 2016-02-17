teamunApp.controller('OfficialActionEditCtrl', ['$scope', '$location', '$state', '$stateParams', 'toaster', '$timeout', 'Upload', '$qupload', '$log', 'QiniuService', 'OfficialActionService', 'DEFAULT_DOMAIN', function($scope, $location, $state, $stateParams, toaster, $timeout, Upload, $qupload, $log, QiniuService, OfficialActionService, DEFAULT_DOMAIN) {

  OfficialActionService.action.get({action_id: $stateParams.action_id}, function(result) {
    $scope.action = result.data.action;
    $scope.poster = $scope.action.poster;
    $scope.publishTime = $scope.action.publishTime;
    $scope.isRealInfo = $scope.action.isRealInfo;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  $scope.updateAction = function(action) {
    action.publishTime = $scope.publishTime ? new Date($scope.publishTime).getTime().toString() : '';
    action.isRealInfo = $scope.isRealInfo;
    action.poster = $scope.poster;
    OfficialActionService.updateOfficialAction.update({action_id: $stateParams.action_id}, $.param(action), function(result) {
      $location.path('/admin/official-action-detail/' + $stateParams.action_id);
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };


  $scope.upToken = '';
  QiniuService.uptoken.get({}, function(result) {
    $scope.upToken = result.data;
  });

  /**
   * 上传海报
   */
  $scope.selectPosterFiles = [];
  var startPoster = function(index) {
    $scope.selectPosterFiles[index].progress = {
      p: 0
    };
    $scope.selectPosterFiles[index].upload = $qupload.upload({
      file: $scope.selectPosterFiles[index].file,
      token: $scope.upToken
    });
    $scope.selectPosterFiles[index].upload.then(function(response) {
      //$log.info(response);
      $scope.poster = 'http://7xkwk0.com2.z0.glb.qiniucdn.com/' + response.key;
    }, function(response) {
      //$log.info(response);
    }, function(evt) {
      $scope.selectPosterFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.uploadposter = function($files) {
    var offsetx = $scope.selectPosterFiles.length;
    for (var i = 0; i < $files.length; i++) {
      $scope.selectPosterFiles[i + offsetx] = {
        file: $files[i]
      };
      startPoster(i + offsetx);
    }
  };


  /**
   * 上传接口
   */
  // $scope.$watch('files', function() {
  //   $scope.upload($scope.files);
  // });
  // $scope.progress = '';
  // $scope.poster = '';
  // $scope.upload = function(files) {
  //   if (files && files.length) {
  //     for (var i = 0; i < files.length; i++) {
  //       var file = files[i];
  //       Upload.upload({
  //         url: DEFAULT_DOMAIN + '/upload',
  //         method: 'POST',
  //         file: file
  //       }).progress(function(evt) {
  //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //         $scope.progress = progressPercentage;
  //       }).success(function(data, status, headers, config) {
  //         $timeout(function() {
  //           $scope.poster = '';
  //           $scope.poster = data.imgurl;
  //           // $scope.uploadLog = 'file: ' + config.fiposterle.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.uploadLog;
  //         });
  //       });
  //     }
  //   }
  // };


}]);
