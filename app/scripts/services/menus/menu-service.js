teamunApp.factory('MenuService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    menuList: $resource(DEFAULT_DOMAIN + '/admin/menus'),
    menu: $resource(DEFAULT_DOMAIN + '/admin/menus/:menu_id', {menu_id: '@menu_id'}),
    parentList: $resource(DEFAULT_DOMAIN + '/admin/menus/parents'),
    ownedParentsList: $resource(DEFAULT_DOMAIN + '/admin/menus/owned-parents'),
    childList: $resource(DEFAULT_DOMAIN + '/admin/menus/children'),
    saveMenu: $resource(DEFAULT_DOMAIN + '/admin/menus', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateMenu: $resource(DEFAULT_DOMAIN + '/admin/menus/:menu_id', {menu_id: '@menu_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeMenu: $resource(DEFAULT_DOMAIN + '/admin/menus/:menu_id', {menu_id: '@menu_id'}, {
      remove: {
        method: "DELETE"
      }
    })
  };
});
