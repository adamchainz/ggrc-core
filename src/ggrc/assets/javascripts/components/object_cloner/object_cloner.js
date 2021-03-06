/*!
 Copyright (C) 2016 Google Inc., authors, and contributors <see AUTHORS file>
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 Created By: urban@reciprocitylabs.com
 Maintained By: urban@reciprocitylabs.com
 */
(function (can, $) {
  'use strict';

  GGRC.Components('objectCloner', {
    tag: 'object-cloner',
    template: '<content/>',
    scope: {
      instance: null,
      modalTitle: '@',
      modalDescription: '@',
      includeObjects: {},
      getIncluded: function () {
        var included = this.attr('includeObjects');
        return _.filter(can.Map.keys(included), function (val) {
          return included[val];
        });
      },
      cloneObject: function (scope, el, ev) {
        var instance = this.instance;
        this.attr('includeObjects', {});

        GGRC.Controllers.Modals.confirm({
          instance: scope,
          modal_title: scope.attr('modalTitle'),
          modal_description: scope.attr('modalDescription'),
          content_view: GGRC.mustache_path + '/' +
            instance.class.root_collection + '/object_cloner.mustache',
          modal_confirm: 'Clone',
          skip_refresh: true,
          button_view: GGRC.mustache_path + '/modals/prompt_buttons.mustache'
        }, function () {
          var clonedInstance = instance.clone({
            cloneOptions: {
              sourceObjectId: instance.id,
              mappedObjects: this.getIncluded()
            }
          });
          clonedInstance.save().done(function (object) {
            GGRC.navigate(object.viewLink);
          });
        }.bind(this));
      }
    }
  });
})(window.can, window.can.$);
