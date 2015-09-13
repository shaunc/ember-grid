import Ember from 'ember';
import layout from './template';
import EmberGrid from '../../ember-grid/component';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  styleBindings: ['scrollX:margin-left[px]'],

  findModel: Ember.on('didInsertElement', function() {
  	var grid = this.nearestOfType(EmberGrid);
	  this.set('_model', grid.get('_columnScrollerModel'));
  }),

  scrollX: Ember.computed('_model', '_model.xPos', function() {
  	return -this.get('_model.xPos');
  })
});
