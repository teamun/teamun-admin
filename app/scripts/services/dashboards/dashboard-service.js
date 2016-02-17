teamunApp.factory('DashboardService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    counts: $resource(DEFAULT_DOMAIN + '/admin/dashboards/users-teams-activities-counts')
  };
});
