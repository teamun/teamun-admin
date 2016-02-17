teamunApp.factory('WechatActivityService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    activity: $resource(DEFAULT_DOMAIN + '/wechats/admin/wechats/activities/:activity_id', {activity_id: '@activity_id'})
  }
});
