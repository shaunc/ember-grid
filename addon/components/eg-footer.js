import Ember from 'ember';
import EmberGridColumn from './eg-column';
import layout from '../templates/components/eg-footer';

export default Ember.Component.extend({
  layout: layout,
	classNames: ['footer-def'],

  didInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGridColumn) {
	    	parentView.set('_footer', this.attrs);
	    }
	  	this.get('element').style.display = 'none';
		});
	}

});
