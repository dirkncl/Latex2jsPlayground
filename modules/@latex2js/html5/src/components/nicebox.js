/*
interface ComponentProps {
  lines: string[];
  [key: string]: any;
}
*/
export function nicebox(that/*: ComponentProps*/)/*: HTMLSpanElement*/ {
  const span = document.createElement('span');
  span.className = 'math nicebox';
  span.innerHTML = that.lines.join('\n');
  return span;
}

