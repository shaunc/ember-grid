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
  },
  /**
	 * 
	 *
	 */
 	merge(lhs) {
 		Object.keys(lhs).forEach((key)=>{
 			const val = lhs.get(key);
 			if(val === undefined) { return; }
 			if (key == '_zones') {
 				Object.keys(val).forEach((zkey)=>{
 					const lzone = val.get(zkey);
 					const rzone = this.get('_zones.' + zkey);
 					if (rzone == null) {
 						this.set('_zones.' + zkey, lzone);
 					} else if(zval != null) {
 						Object.keys(zval).forEach((zikey)=>
 							rzone.set(zikey, zval.get('zikey')));
 					}
 				});
 			}
 			else {
 				this.set(key, val);
 			}
 		})
 	}
});
