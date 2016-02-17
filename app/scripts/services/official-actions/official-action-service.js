teamunApp.factory('OfficialActionService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    action: $resource(DEFAULT_DOMAIN + '/admin/official-actions/:action_id', {action_id: '@action_id'}),
    officialActionList: $resource(DEFAULT_DOMAIN + '/admin/official-actions'),
    saveOfficialAction: $resource(DEFAULT_DOMAIN + '/admin/official-actions', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateOfficialAction: $resource(DEFAULT_DOMAIN + '/admin/official-actions/:action_id', {action_id: '@action_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeOfficialAction: $resource(DEFAULT_DOMAIN + '/admin/official-actions/:action_id', {action_id: '@action_id'}, {
      remove: {
        method: "DELETE"
      }
    }),
    publishOfficialAction: $resource(DEFAULT_DOMAIN + '/admin/official-actions/:action_id/publish', {action_id: '@action_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),


    saveRecruitGroup: $resource(DEFAULT_DOMAIN + '/admin/recruit-groups', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    recruitGroups: $resource(DEFAULT_DOMAIN + '/admin/recruit-groups/:action_id', {action_id: '@action_id'}),
    recruitGroupForEdit: $resource(DEFAULT_DOMAIN + '/admin/recruit-groups/:recruit_group_id/edit', {recruit_group_id: '@recruit_group_id'}),
    updateRecruitGroup: $resource(DEFAULT_DOMAIN + '/admin/recruit-groups/:recruit_group_id', {recruit_group_id: '@recruit_group_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeRecruitGroup: $resource(DEFAULT_DOMAIN + '/admin/recruit-groups/:recruit_group_id', {recruit_group_id: '@recruit_group_id'}, {
      remove: {
        method: "DELETE"
      }
    })
  };
});
