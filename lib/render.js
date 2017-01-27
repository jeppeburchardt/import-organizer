'use babel';

const QUOTE = '\'';
const BREAK_SUB_LT = 2;

const template = (imp) => {
  let code = 'import ';
  if (imp.name) {
    code += imp.name + ' ';
  }
  if (imp.subpackages && imp.subpackages.length > BREAK_SUB_LT) {
    code += ['{\n', ...imp.subpackages.map(sub => `  ${sub},\n`), '} '].join('');
  } else if (imp.subpackages) {
    code += '{ ' + imp.subpackages.join(', ') + ' } ';
  }
  if (imp.name || imp.subpackages) {
    code += 'from '
  }
  code += `${QUOTE}${imp.source}${QUOTE};`;
  return code;
};

const render = (imports) => `${imports.map(template).join('\n')}\n\n`;

export default render;
