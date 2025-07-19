/*
interface ComponentProps {
  lines: string[];
  [key: string]: any;
}
*/
export function math(that/*: ComponentProps*/)/*: HTMLSpanElement*/ {
  const span = document.createElement('span');
  span.className = 'math';
  span.innerHTML = that.lines.join('\n');
  return span;
}

