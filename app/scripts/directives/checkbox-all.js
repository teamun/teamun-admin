teamunApp.directive('checkboxAll', function () {
  return function(scope, iElement, iAttrs) {
    var parts = iAttrs.checkboxAll.split('.');
    iElement.attr('type','checkbox');
    iElement.bind('change', function (evt) {
      scope.$apply(function () {
        var setValue = iElement.prop('checked');
        angular.forEach(scope.$eval(parts[0]), function (v) {
          v[parts[1]] = setValue;
        });
      });
    });
    scope.$watch(parts[0], function (newVal) {
      scope.checkedElements = [];
      var hasTrue, hasFalse;
      angular.forEach(newVal, function (v) {
        if (v[parts[1]]) {
          hasTrue = true;
          scope.checkedElements.push(v);
        } else {
          hasFalse = true;
        }
      });
      console.log(scope.checkedElement);
      if (hasTrue && hasFalse) {
        iElement.attr('checked', false);
        iElement.addClass('greyed');
      } else {
        iElement.attr('checked', hasTrue);
        iElement.removeClass('greyed');
      }
    }, true);
    
  };
});
