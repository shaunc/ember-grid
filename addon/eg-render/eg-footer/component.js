// eg-render/eg-footer

import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['footer'],
  attributeBindings: ['style'],

  style: Ember.computed('width', function() {
    return Ember.String.htmlSafe('width:'+this.get('width')+'px;');
  })
});
