// tests/helpers/test-component
//
// convenience wrapper around `moduleForComponent` which
// starts app and removes styles at end.

import Ember from 'ember';
import { removeStyles } from './styles';
import { moduleForComponent } from 'ember-qunit';
import startApp from './start-app';

var App;

export default function(name, description, callbacks) {
  moduleForComponent(name, description, {
    integration: true,
    beforeEach() {
      App = startApp();
      if( callbacks != null && callbacks.beforeEach === 'function' ) {
        callbacks.beforeEach.call(this);
      }
    },
    afterEach() {
      removeStyles();
      Ember.run(App, App.destroy);
      if( callbacks != null && typeof callbacks.afterEach === 'function' ) {
        callbacks.afterEach.call(this);
      }
    }
  });
}