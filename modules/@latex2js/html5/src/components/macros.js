import { macros as macroStr } from '../../../../@latex2js/macros/src/index.js';
/*
interface ComponentProps {
  [key: string]: any;
}
*/
export function macros(_that/*: ComponentProps*/)/*: HTMLDivElement*/ {
  var div = document.createElement('div');
  div.id = 'latex-macros';
  div.style.display = 'none';
  div.className = 'verbatim';
  div.innerHTML = macroStr;
  return div;
}

