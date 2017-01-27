'use babel';

import { CompositeDisposable } from 'atom';
import parse from './parse';
import render from './render';
import sort from './sort';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'import-organizer:sort': () => this.run()
    }));
  },

  deactivate() {
    //this.importOrganizerView.destroy();
  },

  run() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      // find imports
      const result = parse(editor);

      if (result) {
        // sort imports
        const sorted = sort(result.imports);

        // reformat code
        const code = render(sorted);

        // create undo checkpoint
        const checkpoint = editor.createCheckpoint();

        // insert new import statements into code
        editor.setCursorBufferPosition(result.location);
        editor.insertText(code);
        editor.groupChangesSinceCheckpoint(checkpoint);
      }
    }
  }

};
