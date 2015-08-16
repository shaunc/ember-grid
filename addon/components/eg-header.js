import Ember from 'ember';
import EmberGridColumn from './eg-column';
import layout from '../templates/components/eg-header';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['header-def'],

  didInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGridColumn) {
	    	parentView.set('_header', this.attrs);
	    	parentView.set('_header.element', this.get('element'));
	    }
		  this.get('element').style.display = 'none';
  	});
	}

});
