import Ember from 'ember';
import EmberGrid from './ember-grid';
import layout from './eg-column/template';

export default Ember.Component.extend({
  layout: layout,
	classNames: ['column-def'],

	_column: null,

	didReceiveAttrs: function() {
		this._column = (this._column || Ember.Object.create({}));
		Ember.merge(this._column, this.attrs);
		if (this._column._zones == null) {
			this._column._zones = Ember.Object.create({
				header: null, body: null, footer: null
			})
		}
	},

  didInsertElement: function() {
    this._super.apply(this, arguments);
  	Ember.run.next(this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGrid) {
	    	parentView._addColumn(this.get('_column'));
	    }
	    this.get('element').style.display = 'none';
	  });
	}

});
