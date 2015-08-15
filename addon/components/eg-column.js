import Ember from 'ember';
import EmberGrid from './ember-grid';

export default Ember.Component.extend({

	isVisible: false,
	
  didInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGrid) {
	    	parentView._addColumn(this.attrs);
	    }
	  });
	}

});
