import Ember from 'ember';
import EmberGridColumn from './eg-column';
import layout from './eg-footer/template';

export default Ember.Component.extend({
  layout: layout,
	classNames: ['footer-def'],

  _column: Ember.computed.alias('parentView._column'),

  willInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGridColumn) {
	    	parentView.set('_column._zones.footer', this.attrs);
	    	parentView.set('_column._zones.footer.element', this.get('element'));
	    }
	  	this.get('element').style.display = 'none';
		});
	}

});
