/**
 *
 * @module util/dom-util
 *
 * Utilities for DOM manipulation.
 *
 */

export function moveChildren(source, target, replace) {
  if (source == null || target == null) { return; }
  if (replace) {
    removeChildren(target);
  }
  while (source.firstChild) {
    target.appendChild(source.childNodes[0]);
  }
}
export function removeChildren(source) {
  if (source == null) { return; }
  while (source.lastChild) {
    source.removeChild(source.lastChild);
  }  
}
export function copyChildren(source, target, replace) {
  if (source == null || target == null) { return; }
  if (replace) {
    removeChildren(target);
  }
  if (source.firstChild == null) { return; }
  for(let i = 0; i < source.childNodes.length; i++) {
    let node = source.childNodes[i].cloneNode(true);
    target.appendChild(node);
  }
}