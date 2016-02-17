teamunApp.factory('EventService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    eventList: $resource(DEFAULT_DOMAIN + '/admin/events'),
    event: $resource(DEFAULT_DOMAIN + '/admin/events/:event_id', {event_id: '@event_id'}),
    saveEvent: $resource(DEFAULT_DOMAIN + '/admin/events', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateEvent: $resource(DEFAULT_DOMAIN + '/admin/events/:event_id', {event_id: '@event_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeEvent: $resource(DEFAULT_DOMAIN + '/admin/events/:event_id', {event_id: '@event_id'}, {
      remove: {
        method: "DELETE"
      }
    })
  };
});
