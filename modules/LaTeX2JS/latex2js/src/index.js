import TextExt from './lib/text.js';
import HeadersExt from './lib/headers.js';
import { pstricks as PSTricksExt } from '../../latex2js-pstricks/src/index.js';
import EnvironmentsDefault from './lib/environments.js';
import IgnoreDefault from './lib/ignore.js';

import Parser from './lib/parser.js';

import latex2js_css from './lib/latex2js.css' with {type: "css"}
import latex2js_mathapedia_css from './lib/latex2js.mathapedia.css' with {type: "css"}

globalThis.document.adoptedStyleSheets.push(latex2js_css, latex2js_mathapedia_css)

export default class LaTeX2HTML5 {
  constructor(
    Text = TextExt,
    Headers = HeadersExt,
    Environments = EnvironmentsDefault,
    Ignore = IgnoreDefault,
    PSTricks = PSTricksExt,
    Views = {}
  ) {
    this.Text = Text;
    this.Headers = Headers;
    this.Environments = Environments;
    this.Ignore = Ignore;
    this.PSTricks = PSTricks;
    this.Views = Views;
    this.Delimiters = {};

    Environments.forEach((name) => {
      this.addEnvironment(name);
    });
  }

  addEnvironment(name) {
    var delim = {
      begin: new RegExp('\\\\begin\\{' + name + '\\}'),
      end: new RegExp('\\\\end\\{' + name + '\\}')
    };
    this.Delimiters[name] = delim;
  }

  addView(name, options) {
    this.addEnvironment(name);
    // var view = {};
    // this.Views[name] = this.BaseEnvView.extend(options);
  }

  addText(name, exp, func) {
    this.Text.Expressions[name] = exp;
    this.Text.Functions[name] = func;
  }

  addHeaders(name, begin, end) {
    var exp = {};
    var beginHash = name + 'begin';
    var endHash = name + 'end';
    exp[beginHash] = new RegExp('\\\\begin\\{' + name + '\\}');
    exp[endHash] = new RegExp('\\\\end\\{' + name + '\\}');
    Object.assign(this.Headers.Expressions, exp);
    var fns = {};
    fns[beginHash] = function () {
      return begin || '';
    };
    fns[endHash] = function () {
      return end || '';
    };
    Object.assign(this.Headers.Functions, fns);
  }

  getParser() {
    return new Parser(this);
  }

  parse(text) {
    const parser = new Parser(this);
    const parsed = parser.parse(text);
    parsed.forEach((element) => {
      if (!element.hasOwnProperty('type')) {
        throw new Error('no type!');
      }
      // TODO implement rendering
    });

    return parsed;
  }
}
