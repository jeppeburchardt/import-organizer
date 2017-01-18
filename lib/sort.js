'use babel';

import { compareModules, pattern } from './comparer';

export function sort(editor) {
  const checkpoint = editor.createCheckpoint();
  const imports = [];
  editor.scan(pattern, result => imports.push({
    source: result.match[1],
    text: result.matchText,
  }));
  imports.sort(compareModules);
  editor.scan(pattern, result => {
    result.replace(imports.shift().text);
  });
  editor.groupChangesSinceCheckpoint(checkpoint);
}
