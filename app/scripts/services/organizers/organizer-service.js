teamunApp.factory('OrganizerService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    organizerList: $resource(DEFAULT_DOMAIN + '/admin/organizers'),
    organizer: $resource(DEFAULT_DOMAIN + '/admin/organizers/:organizer_id', {organizer_id: '@organizer_id'}),
    saveOrganizer: $resource(DEFAULT_DOMAIN + '/admin/organizers', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateOrganizer: $resource(DEFAULT_DOMAIN + '/admin/organizers/:organizer_id', {organizer_id: '@organizer_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeOrganizer: $resource(DEFAULT_DOMAIN + '/admin/organizers/:organizer_id', {organizer_id: '@organizer_id'}, {
      remove: {
        method: "DELETE"
      }
    }),
    removeCaptain: $resource(DEFAULT_DOMAIN + '/admin/organizers/:organizer_id/:user_id/removecaptain', {organizer_id: '@organizer_id', user_id: '@user_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
  };
});
