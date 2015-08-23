// eg-footer

import Ember from 'ember';
import EmberGridColumn from '../eg-column/component';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,

  _column: Ember.computed.alias('parentView._column'),

  willInsertElement: function() {
    this._super.apply(this, arguments);

  	Ember.run.scheduleOnce('afterRender', this, function() {
	    var parentView = this.get('parentView');
	    if (parentView instanceof EmberGridColumn) {
        var footer = Ember.Object.create({});
        for (let key in this.attrs) {
          footer[key] = this.getAttr(key);
        }
	    	parentView.set('_column._zones.footer', footer);
	    	parentView.set('_column._zones.footer.element', this.get('element'));
	    }
		});
	}

});
