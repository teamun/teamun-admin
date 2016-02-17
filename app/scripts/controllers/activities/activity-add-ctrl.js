teamunApp.controller('ActivityAddCtrl', ['$scope', '$state', '$stateParams', 'toaster', '$timeout', '$compile', 'Upload', '$qupload', '$log', 'ActivityService', 'EventService', 'TeamService', 'UserService', 'CityService', 'OrganizerService', 'QiniuService', 'DEFAULT_DOMAIN', function($scope, $state, $stateParams, toaster, $timeout, $compile, Upload, $qupload, $log, ActivityService, EventService, TeamService, UserService, CityService, OrganizerService, QiniuService, DEFAULT_DOMAIN) {

  EventService.eventList.get({}, function(result) {
    $scope.events = result.data.events;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  CityService.cityList.get({}, function(result) {
    $scope.cities = result.data.cities;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  //限制活动开始时间不能小于今天
  $scope.today = new Date();
  $scope.yesterday = new Date($scope.today);
  $scope.yesterday.setDate($scope.today.getDate() - 1);

  // TeamService.teamList.get({}, function(data) {
  //   $scope.teams = data.teams;
  // }, function(error) {
  //   toaster.pop('error', error.data.msg);
  // });

  // UserService.userList.get({}, function(result) {
  //   $scope.users = result.data.users;
  // }, function(error) {
  //   toaster.pop('error', error.data.msg);
  // });

  OrganizerService.organizerList.get({}, function(result) {
    $scope.organizers = result.data.organizers;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  $scope.saveActivity = function(activity) {
    var startTime = $scope.startTime ? $scope.startTime.getTime() : '';

    activity.startTime = startTime;
    activity.poster = $scope.poster;
    activity.headerImgs = $scope.headerImgs;
    activity.footerImgs = $scope.footerImgs;
    activity.isSafe = $scope.isSafe;
    activity.isEmergencyContact = $scope.isEmergencyContact;
    activity.isRealInfo = $scope.isRealInfo;
    activity.type = $scope.type;
    activity.location = $scope.location;
    activity.city = $scope.cityName.name;
    activity.longitude = $scope.longitude1;
    activity.latitude = $scope.latitude1;
    if(activity.organizer) activity.organizer = activity.organizer._id;
    if(activity.captain) activity.captain = activity.captain._id;

    ActivityService.saveActivity.save($.param(activity), function(result) {
      if(result.ret === 1) {
        $state.go('admin.activity-add-next-step', {activity_id: result.data.activity._id});
      } else {
        toaster.pop('error', result.msg);  
      }
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
   * 上传头图
   */
  $scope.selectHeaderImgFiles = [];
  $scope.headerImgs = [];
  var startHeaderImgs = function(index) {
    $scope.selectHeaderImgFiles[index].progress = {
      p: 0
    };
    $scope.selectHeaderImgFiles[index].upload = $qupload.upload({
      file: $scope.selectHeaderImgFiles[index].file,
      token: $scope.upToken
    });
    $scope.selectHeaderImgFiles[index].upload.then(function(response) {
//      $log.info(response);
      $scope.headerImgs.push('http://7xkwk0.com2.z0.glb.qiniucdn.com/' + response.key);
    }, function(response) {
      //$log.info(response);
    }, function(evt) {
      $scope.selectHeaderImgFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.uploadheader = function($files) {
    if($scope.selectHeaderImgFiles.length + $files.length > 3) {
      toaster.pop('error', '上传头图不能超过3张');
    } else {
      var offsetx = $scope.selectHeaderImgFiles.length;
      for (var i = 0; i < $files.length; i++) {
        $scope.selectHeaderImgFiles[i + offsetx] = {
          file: $files[i]
        };
        startHeaderImgs(i + offsetx);
      }
    }
  };


  /**
   * 上传尾图
   */
  $scope.selectFooterImgFiles = [];
  $scope.footerImgs = [];
  var startFooterImgs = function(index) {
    $scope.selectFooterImgFiles[index].progress = {
      p: 0
    };
    $scope.selectFooterImgFiles[index].upload = $qupload.upload({
      file: $scope.selectFooterImgFiles[index].file,
      token: $scope.upToken
    });
    $scope.selectFooterImgFiles[index].upload.then(function(response) {
      //$log.info(response);
      $scope.footerImgs.push('http://7xkwk0.com2.z0.glb.qiniucdn.com/' + response.key);
    }, function(response) {
      //$log.info(response);
    }, function(evt) {
      $scope.selectFooterImgFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.uploadfooter = function($files) {
    if($scope.selectFooterImgFiles.length + $files.length > 3) {
      toaster.pop('error', '上传尾图不能超过3张');
    } else {
      var offsetx = $scope.selectFooterImgFiles.length;
      for (var i = 0; i < $files.length; i++) {
        $scope.selectFooterImgFiles[i + offsetx] = {
          file: $files[i]
        };
        startFooterImgs(i + offsetx);
      }
    }
  };

  /**
   * 上传接口
   */
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


  // $scope.headerImgs = [];
  // $scope.uploadheader = function(files) {
  //   if (files && files.length) {
  //     for (var i = 0; i < files.length; i++) {
  //       var file = files[i];
  //       Upload.upload({
  //         url: DEFAULT_DOMAIN + '/upload',
  //         method: 'POST',
  //         file: file
  //       }).progress(function(evt) {
  //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //       }).success(function(data, status, headers, config) {
  //         $timeout(function() {
  //           $scope.headerImgs.push(data.imgurl);
  //         });
  //       });
  //     }
  //   }
  // };


  // $scope.footerImgs = [];
  // $scope.uploadfooter = function(files) {
  //   if (files && files.length) {
  //     for (var i = 0; i < files.length; i++) {
  //       var file = files[i];
  //       Upload.upload({
  //         url: DEFAULT_DOMAIN + '/upload',
  //         method: 'POST',
  //         file: file
  //       }).progress(function(evt) {
  //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //       }).success(function(data, status, headers, config) {
  //         $timeout(function() {
  //           $scope.footerImgs.push(data.imgurl);
  //         });
  //       });
  //     }
  //   }
  // };


  /**
   * 地图设置
   */
  $scope.ck = function() {
    $scope.longitude1 = 1;
  }
  $scope.stt = {
    "width": "300px",
    "height": "300px"
  };
  $scope.city = null;
  $scope.ops = {};
  $scope.longitude1 = null;
  $scope.latitude1 = null;
  $scope.location = '';
  $scope.cityName = '';

  // $scope.setCityName = function() {
  //   $scope.cityName = $("#cityNameSelect option:selected").html();
  // };

  $scope.area = function() {
    $scope.city = $scope.cityName.name + $scope.location;
  };

  $scope.isSafe = true;
  $scope.isEmergencyContact = true;
  $scope.isRealInfo = true;
  $scope.type = '0';
  // $scope.paymentWay = 'online';
  // $scope.isFree = true;
  // $scope.numLimit = 0;

  function strtotimestamp(datestr) {
    var new_str = datestr.replace(/:/g, "-");
    new_str = new_str.replace(/ /g, "-");
    var arr = new_str.split("-");
    var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));

    return (datum.getTime() / 1000); //为PHP所用
  }

  $scope.captains = '';
  $scope.isPresonal = false;
  $scope.selectOrganize = function(organizer) {
    if(organizer) {
      if (organizer.type[0] === 'presonal') {
        $scope.isPresonal = true;
      } else if(organizer.type[0] === 'organize') {
        $scope.isPresonal = false;
        $scope.captains = organizer.captains;
      }
    } else {
      $scope.captains = '';
    }
  };
























}]);
