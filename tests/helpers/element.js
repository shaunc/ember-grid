// tests/helpers/element

export function getGrid(context) {
  return context.$('.ember-grid')[0];
}
export function getHeader(context) {
  return context.$('.ember-grid .header')[0];
}
export function getBody(context) {
  return context.$('.ember-grid .body')[0];
}
export function getFooter(context) {
  return context.$('.ember-grid .footer')[0];
}
var GETTER = {
  'grid': getGrid,
  'header': getHeader,
  'body': getBody,
  'footer': getFooter
};

export function getElement(context, name) {
  return GETTER[name](context);
}
export function readDimensions(element, ...dimensions) {
  var measured = {};
  var raw = element.style; // window.getComputedStyle(element);
  for (let key in dimensions) {
    let dim = dimensions[key];
    measured[dim] = parseFloat(raw[dim]);
  }
  return measured;
}
export function readElementDimensions(context, name, ...dimensions) {
  var element = getElement(context, name);
  if (element == null) {
    return {};
  }
  return readDimensions(element, ...dimensions);
}
