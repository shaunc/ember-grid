import Ember from 'ember';

export default Ember.Object.extend({
	init: function() {
		this.setProperties({
			width: 0,
		  resizable: true,
		  _zones: {}
		});

		this.set('_zones.header', null);
		this.set('_zones.body', null);
		this.set('_zones.footer', null);
  }
});
