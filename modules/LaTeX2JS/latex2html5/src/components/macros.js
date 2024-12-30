import macroStr from '../../../latex2js-macros/src/index.js';

export default function render(that) {
  var div = document.createElement('div');
  div.id = 'latex-macros';
  div.style.display = 'none';
  div.className = 'verbatim';
  div.innerHTML = macroStr;
  return div;
}
