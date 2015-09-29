// eg-column

import Ember from 'ember';
import DeclarationContainer from 'ember-declarative/ed-container/mixin';
import DeclarationBase from 'ember-declarative/decl/ed-base/mixin';
import layout from './template';
import Column from './model';

export default Ember.Component.extend(DeclarationContainer, DeclarationBase, {
  layout: layout,

  grid: Ember.computed.alias('declarationContainer'),
  _column: Ember.computed(function(){ return Column.create(); }),
  setupAttrs: Ember.on('didReceiveAttrs', function(){
    const column = this.get('_column');
    Object.keys(this.attrs).forEach((attr)=>{
      column[attr] = this.getAttr(attr);
    });
  }),

});
