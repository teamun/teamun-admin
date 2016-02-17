teamunApp.controller('OrganizerEditCtrl', ['$scope', '$location', '$state', '$stateParams', 'toaster', '$timeout', 'Upload', '$qupload', '$log', 'QiniuService', 'OrganizerService', 'UserService', 'DEFAULT_DOMAIN', function($scope, $location, $state, $stateParams, toaster, $timeout, Upload, $qupload, $log, QiniuService, OrganizerService, UserService, DEFAULT_DOMAIN) {

  UserService.userList.get({}, function(result) {
    $scope.captains = result.data.users;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  OrganizerService.organizer.get({organizer_id: $stateParams.organizer_id}, function(result) {
    $scope.organizer = result.data.organizer;
    $scope.logo = result.data.organizer.logo;
    $scope.type = result.data.organizer.type;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  $scope.updateOrganizer = function(organizer) {
    organizer.logo = $scope.logo;
    organizer.type = $scope.type;
    OrganizerService.updateOrganizer.update({organizer_id: $stateParams.organizer_id}, $.param(organizer), function(data) {
      toaster.pop('success', "更新成功");
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
      $scope.logo = 'http://7xkwk0.com2.z0.glb.qiniucdn.com/' + response.key;
    }, function(response) {
      //$log.info(response);
    }, function(evt) {
      $scope.selectPosterFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.uploadlogo = function($files) {
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
  // $scope.logo = '';
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
  //           $scope.logo = '';
  //           $scope.logo = data.imgurl;
  //           // $scope.uploadLog = 'file: ' + config.fiposterle.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.uploadLog;
  //         });
  //       });
  //     }
  //   }
  // };

  $scope.addOrganizerCaptain = function(organizer) {
    OrganizerService.updateOrganizer.update({organizer_id: organizer._id}, $.param(organizer), function(data) {
      angular.element(document.querySelector('#addCaptainModal')).modal('hide');

      $timeout(goOrganizerRefresh, 500);
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  function goOrganizerRefresh() {
    $state.go($state.current, {}, {
      reload: true
    });
  };

  $scope.removeCaptain = function(captain) {
    if (confirm("确认删除该领队吗？")) {
      OrganizerService.removeCaptain.update({organizer_id: $stateParams.organizer_id, user_id: captain._id}, function(result) {
        toaster.pop('success', '删除成功');
        $scope.organizer.captains.splice($scope.organizer.captains.indexOf(captain), 1);
      }, function(error) {
        toaster.pop('error', error.data.msg);
      });
    }
  };

}]);
