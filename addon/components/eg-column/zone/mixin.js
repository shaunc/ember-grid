// ember-grid/eg-column/zone/mixin

import Ember from 'ember';

export default Ember.Mixin.create({

  zoneName: null,
  _column: Ember.computed.alias('declarationContainer._column'),

  /**
   * Initialize the data object for the zone. Name of data object is zone
   * name with "_" prepended.
   */
  init() {
    this._super();
    const zoneName = this.get('zoneName');
    this.set('_' + zoneName, Ember.Object.create({portal : this}));
  },
  /**
   * After registration with column, set column data zone with zone
   * data.
   */
  registered: Ember.on('didRegisterDeclaration', function(){
    const zoneName = this.get('zoneName');
    const column = this.get('_column');
    column.set('_zones.' + zoneName, this.get('_' + zoneName));
  }),
  /**
   * Copy any passed attributes into zone data.
   */
  receivedAttrs: Ember.on('didReceiveAttrs', function(){
    const zone = this.get('_' + this.get('zoneName'));
    for (let key in this.attrs) {
      zone.set(key, this.getAttr(key));
    }
  })

})