// dummy/grid-example

import Ember from 'ember';

export default Ember.Component.extend({
  layout: Ember.computed('layoutString', 'options', function(){
    return Ember.Handlebars.compile(this.get('layoutString'));
  }),
  didReceiveAttrs() {
    this._super();

    var options = this.getAttr('options');
    for (let opt in options) {
      this.set(opt, options[opt]);
    }
    var templateString = this.getAttr('layoutString').trim();
    if (templateString.string != null) {
      templateString = templateString.string;
    }
    this.set('layoutString', templateString);
  },
  didRender() {
    var pelement = this.element.parentNode;
    var {top} = pelement.getBoundingClientRect();
    pelement.style.height = ($(window).height() - top - 20) + 'px';

  }

});


