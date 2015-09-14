import Ember from 'ember';

export default Ember.Object.extend({
	init: function() {
		this.set('xPos', 0);
    this.set('nativeScroll', false);
  }
});
