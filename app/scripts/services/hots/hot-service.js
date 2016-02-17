teamunApp.factory('HotService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    hot: $resource(DEFAULT_DOMAIN + '/admin/hots/:hot_id', {hot_id: '@hot_id'}),
    hotList: $resource(DEFAULT_DOMAIN + '/admin/hots'),
    saveHot: $resource(DEFAULT_DOMAIN + '/admin/hots', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateHot: $resource(DEFAULT_DOMAIN + '/admin/hots/:hot_id', {hot_id: '@hot_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeHot: $resource(DEFAULT_DOMAIN + '/admin/hots/:hot_id', {hot_id: '@hot_id'}, {
      remove: {
        method: "DELETE"
      }
    })
  };
});
