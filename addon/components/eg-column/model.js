import Ember from 'ember';

export default Ember.Object.extend({
	init: function() {
		if (this.resizable == null) {
			this.resizable = true;
		}
		if (this.align == null) {
			this.align = 'left';
		}
		this._zones = Ember.Object.create();
		this.set('_zones.header', null);
		this.set('_zones.body', null);
		this.set('_zones.footer', null);
  }
});
