teamunApp.factory('SessionService', function ($resource, $location, DEFAULT_DOMAIN) {
	return {
		set: function(key, value) {
			return sessionStorage.setItem(key, value);
		}, 
		get: function(key) {
			return sessionStorage.getItem(key);
		}, 
		destory: function(key) {
			return sessionStorage.removeItem(key);
		}
	};
});