teamunApp.factory('ActivityService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    activityList: $resource(DEFAULT_DOMAIN + '/admin/activities'),
    activity: $resource(DEFAULT_DOMAIN + '/admin/activities/:activity_id', {activity_id: '@activity_id'}),
    activityForEdit: $resource(DEFAULT_DOMAIN + '/admin/activities/:activity_id/edit', {activity_id: '@activity_id'}),
    saveActivity: $resource(DEFAULT_DOMAIN + '/admin/activities', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateActivity: $resource(DEFAULT_DOMAIN + '/admin/activities/:activity_id', {activity_id: '@activity_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    publishActivity: $resource(DEFAULT_DOMAIN + '/admin/activities/:activity_id/publish', {activity_id: '@activity_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    remove: $resource(DEFAULT_DOMAIN + '/admin/activities-remove/:activity_id', {activity_id: '@activity_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    recommendRemove: $resource(DEFAULT_DOMAIN + '/admin/activities-recommend-remove/:activity_id', {activity_id: '@activity_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    recommendAdd: $resource(DEFAULT_DOMAIN + '/admin/activities-recommend-add/:activity_id', {activity_id: '@activity_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),


    saveActivityGroup: $resource(DEFAULT_DOMAIN + '/admin/activity-groups', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    activityGroups: $resource(DEFAULT_DOMAIN + '/admin/activity-groups/:activity_id', {activity_id: '@activity_id'}),
    activityGroupForEdit: $resource(DEFAULT_DOMAIN + '/admin/activity-groups/:activity_group_id/edit', {activity_group_id: '@activity_group_id'}),
    updateActivityGroup: $resource(DEFAULT_DOMAIN + '/admin/activity-groups/:activity_group_id', {activity_group_id: '@activity_group_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeActivityGroup: $resource(DEFAULT_DOMAIN + '/admin/activity-groups/:activity_group_id', {activity_group_id: '@activity_group_id'}, {
      remove: {
        method: "DELETE"
      }
    }),
    groupmembers: $resource(DEFAULT_DOMAIN + '/admin/activity-groups/members/:activity_id', {activity_id: '@activity_id'}),

  };
});
