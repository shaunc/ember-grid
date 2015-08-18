import Ember from 'ember';
import EmberGridColumn from './eg-column';
import layout from './eg-header/template';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['header-def'],

  _column: Ember.computed.alias('parentView._column'),

  didInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGridColumn) {
	    	parentView.set('_column._zones.header', this.attrs);
	    	parentView.set('_column._zones.header.element', this.get('element'));
	    }
		  this.get('element').style.display = 'none';
  	});
	}

});
