import { pstricks as PSTricksExt } from '../../../@latex2js/pstricks/src/index.js';

import * as TextExt from './lib/text.js';
import * as HeadersExt from './lib/headers.js';
import { environments as EnvironmentsDefault } from './lib/environments.js';
import { ignore as IgnoreDefault } from './lib/ignore.js';
import { Parser } from './lib/parser.js';

import fonts_css from '../fonts.css' with {type: "css"}
import latex2js_css from '../latex2js.css' with {type: "css"}
import latex2js_mathapedia_css from '../latex2js.mathapedia.css' with {type: "css"}

globalThis.document.adoptedStyleSheets.push(fonts_css, latex2js_css, latex2js_mathapedia_css)

export class LaTeX2HTML5 {
  Text/*: any*/;
  Headers/*: any*/;
  Environments/*: any*/;
  Ignore/*: any*/;
  PSTricks/*: any*/;
  Views/*: any*/;
  Delimiters/*: any*/;

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

    Environments.forEach((name/*: string*/) => {
      this.addEnvironment(name);
    });
  }

  addEnvironment(name/*: string*/)/*: void*/ {
    var delim = {
      begin: new RegExp('\\\\begin\\{' + name + '\\}'),
      end: new RegExp('\\\\end\\{' + name + '\\}')
    };
    this.Delimiters[name] = delim;
  }

  addView(name/*: string*/, _options/*: any*/)/*: void*/ {
    this.addEnvironment(name);
    // var view = {};
    // this.Views[name] = this.BaseEnvView.extend(options);
  }

  addText(name/*: string*/, exp/*: RegExp*/, func/*: Function*/)/*: void*/ {
    this.Text.Expressions[name] = exp;
    this.Text.Functions[name] = func;
  }

  addHeaders(name/*: string*/, begin/*?: string*/, end/*?: string*/)/*: void*/ {
    var exp/*: { [key: string]: RegExp }*/ = {};
    var beginHash = name + 'begin';
    var endHash = name + 'end';
    exp[beginHash] = new RegExp('\\\\begin\\{' + name + '\\}');
    exp[endHash] = new RegExp('\\\\end\\{' + name + '\\}');
    Object.assign(this.Headers.Expressions, exp);
    var fns/*: { [key: string]: Function }*/ = {};
    fns[beginHash] = function () {
      return begin || '';
    };
    fns[endHash] = function () {
      return end || '';
    };
    Object.assign(this.Headers.Functions, fns);
  }

  getParser()/*: any*/ {
    return new Parser(this);
  }

  parse(text/*: string*/)/*: any[]*/ {
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

export default LaTeX2HTML5