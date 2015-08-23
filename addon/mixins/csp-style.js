import Ember from 'ember';

var StyleObserver = Ember.Object.extend({
	target: null,
	property: null,
	cssName: null,
	unit: null,
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

	_propertyDidChange: function (/*target, property*/) {
		this._setStyle();
	},

	_setStyle: function() {
		var name = this.get('cssName');
		var unit = this.get('unit');
		var value = this._getValue();
		var cssStyle = this.get('_cssStyle');
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

	_getValue: function() {
		var property = this.get('property');
		return this.get('target.'+property);
	},

	_removeStyle: function() {
		var name = this.get('cssName');
		var cssStyle = this.get('_cssStyle');
		cssStyle.removeProperty(name);
	}
});

var YesNoStyleObserver = Ember.Object.extend({
	yesNo: null,

	_getValue: function() {
		var value = this._super();
		var yesNo = this.get('yesNo');
		if (yesNo)
		{
			value = value ? yesNo.yes : yesNo.no;
		}
		return value;
	}
});

export default Ember.Mixin.create({
	
	_styleObservers: [],

	_regex: /^(([^\?:]+):)?([a-z0-9_\.-]+)(\[([a-z%]+)\])?(\?([a-z0-9_\.\-]*):([a-z0-9_\.\-]*))?$/i,

	doInit: Ember.on('willInsertElement', function() {
		this._refreshBindings();
	}),

	styleBindingsChanged: Ember.observer('styleBindings', function() {
		this._refreshBindings();
	}),

	_refreshBindings: function() {
		var styleBindings = this.get('styleBindings');
		if (!styleBindings) { 
			styleBindings = []; 
		}
		var observers = [];
		for (var i=0; i< styleBindings.length; i++) {
			var binding = styleBindings[i];

			var match = binding.match(this.get('_regex'));
			if (match) {
	      var cssProp = match[3];
	      var emberProp = match[2] || Ember.String.camelize(cssProp);
	      var unit = match[5];
	      var type = StyleObserver;
	      var properties = {
					target: this,
					property: emberProp,
					cssName: cssProp,
					unit: unit
				};
	      if (match[6]) {
	      	type = YesNoStyleObserver;
	        properties.yesNo = {
	        	yes: match[7],
	        	no: match[8]
	        };
	      }
	      var observer = type.create(properties);
				observers.push(observer);
	    }
		}
		this.set('_styleObservers', observers);
	}

});
