import Ember from 'ember';

var StyleObserver = Ember.Object.extend({
	target: null,
	property: null,
	cssName: null,
	unit: null,
	yesNo: null,
	_cssStyle: null,

	_setup: Ember.on('init', function() {
		this.set('_cssStyle', this.get('target.element').style);
  	this._startObserving();
  	this._setStyle();
	}),

	_teardown: Ember.on('willDestroy', function() {
  	this._stopObserving();
  	this._removeStyle();
	}),

	_startObserving: function() {
		this.get('target').addObserver(this.get('property'), this, '_propertyDidChange');
	},

	_stopObserving: function() {
		this.get('target').removeObserver(this.get('property'), this, '_propertyDidChange');
	},

	_propertyDidChange: function (target, property) {
		this._setStyle();
	},

	_setStyle: function() {
		var name = this.get('cssName');
		var property = this.get('property');
		var unit = this.get('unit');
		var value = this.get('target.'+property);
		var cssStyle = this.get('_cssStyle');
		var yesNo = this.get('yesNo');
		if (yesNo)
		{
			value = value ? yesNo.yes : yesNo.no;
		}
		// add units to numeric value
		if (!isNaN(parseFloat(value)) && isFinite(value)) {
			value = value + unit;
		}
		// escape if necessary
		if (!(value instanceof Ember.Handlebars.SafeString)) {
			value = Ember.Handlebars.Utils.escapeExpression(value);
		}
		// set the property
		if (value != null)
		{
			cssStyle.setProperty(name, value);
		}
		else {
			cssStyle.removeProperty(name, value);
		}
	},

	_removeStyle: function() {
		var name = this.get('cssName');
		var cssStyle = this.get('_cssStyle');
		cssStyle.removeProperty(name);
	}
});

export default Ember.Mixin.create({
	
	_oldBindings: [],
	_styleObservers: [],

	_regex: /^(([^\?:]+):)?([a-z0-9_\.-]+)(\[([a-z%]+)\])?(\?([a-z0-9_\.\-]*):([a-z0-9_\.\-]*))?$/i,

	doInit: Ember.on('willInsertElement', function() {
		this._refreshBindings();
	}),

	styleBindingsChanged: Ember.observer('styleBindings', function() {
		this._refreshBindings();
	}),

	_refreshBindings: function() {
		var oldBindings = this.get('_oldBindings');
		var newBindings = this.get('styleBindings');
		if (!newBindings) { 
			newBindings = []; 
		};
		var observers = [];
		for (var i=0; i< newBindings.length; i++) {
			var binding = newBindings[i];

			var match = binding.match(this.get('_regex'));
			if (match) {
	      var cssProp = match[3];
	      var emberProp = match[2] || Ember.String.camelize(cssProp);
	      var unit = match[5];
	      var observer = StyleObserver.create({
					target: this,
					property: emberProp,
					cssName: cssProp,
					unit: unit
				});
	      if (match[6]) {
	        observer.yesNo = Object.create(null);
	        observer.yesNo.yes = match[7];
	        observer.yesNo.no = match[8];
	      }
				observers.push(observer);
	    };
		}
		this.set('_styleObservers', observers);
	}

});
