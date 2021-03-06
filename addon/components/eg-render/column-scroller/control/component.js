import Ember from 'ember';
import layout from './template';
import EmberGrid from '../../../ember-grid/component';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout: layout,
  classNames: ['column-scroll-control'],
  styleBindings: ['_scrollbarHeight:height[px]'],

  findModel: Ember.on('didInsertElement', function() {
    Ember.run.later(()=> {
      if (this.isDestroying) { return; }
      var grid = this.nearestOfType(EmberGrid);
      if (grid)
      {
        var model = grid.get('_columnScrollerModel');
        this.set('_model', model);
        model.set('nativeScroll', this.get('_scrollbarHeight') === 0);
      }
    });
  }),

  getScrollbarHeight: Ember.on('didInsertElement', function() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.height = "100px";
    document.body.appendChild(outer);

    var heightNoScroll = outer.offsetHeight;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.height = "100%";
    outer.appendChild(inner);        

    var heightWithScroll = inner.offsetHeight;

    // remove divs
    outer.parentNode.removeChild(outer);

    this.set('_scrollbarHeight', heightNoScroll - heightWithScroll);
	}),

	bindScroll: Ember.on('didUpdate', function() {
    Ember.run.later(()=> {
      if (this.scrollBound) { return; }
      var scrollable = this.$('.scrollable');
      if (scrollable[0]) {
        scrollable.on('scroll', this.didScroll.bind(this));
        this.scrollBound = true;
      }
    });
	}),

	unbindScroll: Ember.on('willDeleteElement', function() {
		this.$('.scrollable').off('scroll', this.didScroll.bind(this));
    this.scrollBound = false;
	}),

	didScroll() {
		Ember.run.debounce(this, this.scrollTo, 10);
	},

	scrollTo() {
		this.set('_model.xPos', this.$('.scrollable')[0].scrollLeft);
	}

});
