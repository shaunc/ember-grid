/**
 *
 * @param element DOM element
 *
 * Calculates space available to element in parent element.
 *
 * Styles element to 100% height & width then measures element
 * and puts back original styles.
 *
 */

export default function potentialDimensions(element) {
  if (element == null) { return; }
  var {height, width, position, display, boxSizing} = element.style;
  element.style.boxSizing = 'border-box';
  element.style.height = '100%';
  element.style.width = '100%';
  element.style.position = 'static';
  element.style.display = 'block';
  var dimensions = {
    inner: {
      width: element.clientWidth,
      height: element.clientHeight
    },
    outer: {
      width: element.offsetWidth,
      height: element.offsetHeight
    }
  };
  element.style.width = width;
  element.style.height = height;
  element.style.position = position;
  element.style.display = display;
  element.style.boxSizing = boxSizing;
  return dimensions;
}
