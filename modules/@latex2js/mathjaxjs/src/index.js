export const DEFAULT_CONFIG = {
  options: {
    enableMenu: false,
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    packages: ['base', 'ams', 'newcommand', 'configmacros']
  },
  svg: {fontCache: 'global'},
  startup: {
    ready: () => {
      console.log('MathJax v3 startup ready');
    }
  }
};

const DEFAULT_SCRIPT = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg-full.js';

let mathJaxInstance/*: any*/ = null;

export const getMathJax = () => mathJaxInstance || (globalThis/* as any*/).MathJax;

export const loadMathJax = async (callback = () => { }, config = DEFAULT_CONFIG) => {
  if (typeof window === 'undefined') {
    callback();
    return;
  }

  if ((globalThis/* as any*/).MathJax) {
    mathJaxInstance = (globalThis/* as any*/).MathJax;
    callback();
    return;
  }

  try {
    (globalThis/* as any*/).MathJax = {
      ...config,
      startup: {
        ...config.startup,
        ready: () => {
          (globalThis/* as any*/).MathJax.startup.defaultReady();
          mathJaxInstance = (globalThis/* as any*/).MathJax;
          if (config.startup?.ready) {
            config.startup.ready();
          }
          callback();
        }
      }
    };

    const script = document.createElement('script');
    script.src = DEFAULT_SCRIPT;
    script.async = true;
    script.id = 'MathJax-script';
    script.onload = () => {
      console.log('MathJax v3 script loaded from CDN');
    };
    script.onerror = () => {
      console.error('Failed to load MathJax v3 from CDN');
      callback();
    };

    document.head.appendChild(script);

  } catch (error) {
    console.error('Failed to load MathJax v3:', error);
    callback();
  }
};
