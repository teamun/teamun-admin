teamunApp.factory('LoginService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    login: $resource(DEFAULT_DOMAIN + '/auth/login', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    logout: $resource(DEFAULT_DOMAIN + '/admin/logout', {}),
    checkSession: $resource(DEFAULT_DOMAIN + '/users/me'),
  };
});
