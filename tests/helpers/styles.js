// tests/helpers/styles.js

export function addStyles(styles, nozoom = true) {
  var rules = [];
  for (let key in styles) {
    let directive = styles[key];
    key = '#ember-testing ' + key;
    rules.push(`${key} { ${directive} }`);
  }
  // zoom from testem causes rounding errors in browser calculations.
  if (nozoom) {
    rules.push('#ember-testing { zoom: 1;}');
  }
  var rule = `<style id="extra-style" type='text/css'>
        ${rules.join('\n')}
      </style>`;
  $(rule).appendTo('head');
}
export function removeStyles() {
  $('style#extra-style').remove();

}