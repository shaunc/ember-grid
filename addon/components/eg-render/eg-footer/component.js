import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['footer'],
  attributeBindings: ['style'],

  style: Ember.computed('width', function() {
    return 'width:'+this.get('width')+'px;';
  })
});
