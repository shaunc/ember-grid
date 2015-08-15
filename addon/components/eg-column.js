import Ember from 'ember';
import EmberGrid from './ember-grid';
import layout from '../templates/components/eg-header';

export default Ember.Component.extend({
  layout: layout,
	classNames: ['column-def'],

	_column: null,

  didInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGrid) {
	    	var column = this.attrs;
	    	column._zones = {
	    		header: this.get('_header'),
	    		body: this.get('_body'),
	    		footer: this.get('_footer')
	    	};

	    	this.set('_column', column);
	    	parentView._addColumn(column);
	    }
	    this.get('element').style.display = 'none';
	  });
	}

});
