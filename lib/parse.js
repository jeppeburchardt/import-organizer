'use babel';

const pattern =  /^(\/\/[\sa-z]+[\n\r]+)?import\s([a-z]+)?,?\s?({([^}]+)}\s)?(from\s)?['|"]([^"']*)['"];?[\r\n\s]+/gim;

const parse = (editor) => {
  const imports = [];
  let location;
  editor.scan(pattern, result => {
    if (!location) {
      location = result.range.start;
    }
    imports.push({
      code: result.match[0],
      group: result.match[1],
      name: result.match[2],
      source: result.match[6],
      subpackages: result.match[4] && result.match[4].replace(/\s/g, '').split(',').filter(name => !!name),
      text: result.matchText,
    });
    result.replace('');
  });

  if (imports.length === 0) {
    return undefined;
  }

  return {
    imports,
    location,
  };
};

export default parse;
