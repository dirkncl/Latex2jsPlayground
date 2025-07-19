import { LaTeX2HTML5 as LaTeX2JS } from '../../latex2js/src/index.js';
import { getMathJax, loadMathJax } from '../../mathjaxjs/src/index.js';
import { pspicture } from './components/pspicture.js';
import { nicebox } from './components/nicebox.js';
import { enumerate } from './components/enumerate.js';
import { verbatim } from './components/verbatim.js';
import { math } from './components/math.js';
import { macros } from './components/macros.js';
import pkg from '../package.json' with {type:'json'};

const version = pkg.version;
 
const ELEMENTS = { pspicture, nicebox, enumerate, verbatim, math, macros };

export { pspicture, nicebox, enumerate, verbatim, math, macros, version };

export default function LaTeX2Html(tex/*: string*/, resolve/*: (div: HTMLDivElement) => void*/)/*: void*/ {
  const done = () => {
    const latex = new LaTeX2JS();
    const parsed = latex.parse(tex);
    const div = document.createElement('div');
    div.className = 'latex-container';
    parsed &&
      parsed.forEach &&
      parsed.forEach((el/*: any*/) => {
        if (ELEMENTS.hasOwnProperty(el.type)) {
          const elementType = el.type/* as keyof typeof ELEMENTS*/;
          div.appendChild(ELEMENTS[elementType](el));
        }
      });
    resolve(div);
  };

  if (getMathJax()) {
    return done();
  }
  loadMathJax(done);
}

export const init = ()/*: void*/ => {
  loadMathJax();
  document.querySelectorAll('script[type="text/latex"]').forEach((el) => {
    LaTeX2Html(el.innerHTML, (div/*: HTMLDivElement*/) => {
      if (el.parentNode) {
        el.parentNode.insertBefore(div, el.nextSibling);
      }
    });
  });
};

export function render(graphTex, el) {
  loadMathJax()
  LaTeX2Html(graphTex, (div) => {
    el.appendChild(div);
  });
} 