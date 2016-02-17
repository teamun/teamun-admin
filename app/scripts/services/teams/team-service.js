teamunApp.factory('TeamService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    teamList: $resource(DEFAULT_DOMAIN + '/admin/teams'),
    team: $resource(DEFAULT_DOMAIN + '/admin/teams/:team_id', {team_id: '@team_id'}),
    saveTeam: $resource(DEFAULT_DOMAIN + '/admin/teams', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateTeam: $resource(DEFAULT_DOMAIN + '/admin/teams/:team_id', {team_id: '@team_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    recommendRemove: $resource(DEFAULT_DOMAIN + '/admin/teams-recommend-remove/:team_id', {team_id: '@team_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
  };
});
