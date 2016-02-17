teamunApp.factory('TokenInterceptorService', function($q, AuthenticationService) {
  return {
    request: function(config) {

      //判断是否包含七牛上传upload_token，如果包含修改headers authorization 参数，不然会被每次请求自己服务器的token冲掉。
      if(config.headers.Authorization) {
        if(config.headers.Authorization.indexOf('UpToken') != -1){
          config.headers = config.headers || {};
          if (localStorage.token) {
            config.headers.Authorization = config.headers.Authorization;
          }
          return config;
        }
      } else {
        config.headers = config.headers || {};
        if (localStorage.token) {
          config.headers.authorization = localStorage.token;
        }
        return config;
      }
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});
