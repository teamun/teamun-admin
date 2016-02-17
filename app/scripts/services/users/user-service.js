teamunApp.factory('UserService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    userList: $resource(DEFAULT_DOMAIN + '/users'),
    user: $resource(DEFAULT_DOMAIN + '/users/:user_id', {user_id: '@user_id'}),
    saveUser: $resource(DEFAULT_DOMAIN + '/users', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateUser: $resource(DEFAULT_DOMAIN + '/users/:user_id', {user_id: '@user_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    addTag: $resource(DEFAULT_DOMAIN + '/admin/users/add-tag/:user_id/:tag', {user_id: '@user_id', tag: '@tag'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeTag: $resource(DEFAULT_DOMAIN + '/admin/users/remove-tag/:user_id/:tag', {user_id: '@user_id', tag: '@tag'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
  };
});
