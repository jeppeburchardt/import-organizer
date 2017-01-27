'use babel';

import ImportOrganizer from '../lib/import-organizer';

describe('ImportOrganizer', () => {

  let editor, workspaceElement, workspacePromise, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    workspacePromise = atom.workspace.open();
    activationPromise = atom.packages.activatePackage('import-organizer');
    waitsForPromise(() => workspacePromise);
  });

  it('sort imports', () => {
    runs(() => {
      // arrange
      editor = atom.workspace.getActiveTextEditor();
      editor.setText(
        'import aComponent from \'./acomponent\';\n' +
        'import react from \'react\';\n\n'
      );

      // act
      atom.commands.dispatch(workspaceElement, 'import-organizer:sort');
      waitsForPromise(() => activationPromise);

      // assert
      expect(editor.getText()).toBe(
        'import react from \'react\';\n' +
        'import aComponent from \'./acomponent\';\n\n'
      );
    });
  });

  it('should split multiple imports to lines', () => {
    runs(() => {
      // arrange
      editor = atom.workspace.getActiveTextEditor();
      editor.setText('import { a, b, c } from \'./acomponent\';\n\n');

      // act
      atom.commands.dispatch(workspaceElement, 'import-organizer:sort');
      waitsForPromise(() => activationPromise);

      // assert
      expect(editor.getText()).toBe(
        'import {\n' +
        '  a,\n' +
        '  b,\n' +
        '  c,\n' +
        '} from \'./acomponent\';\n\n'
      );
    });
  });

  it('should remove duplicate imports', () => {
    runs(() => {
      // arrange
      editor = atom.workspace.getActiveTextEditor();
      editor.setText(
        'import \'./acomponent\';\n' +
        'import \'./acomponent\';\n\n'
      );

      // act
      atom.commands.dispatch(workspaceElement, 'import-organizer:sort');
      waitsForPromise(() => activationPromise);

      // assert
      expect(editor.getText()).toBe(
        'import \'./acomponent\';\n\n'
      );
    });
  });

  it('should remove duplicate, join and sort sub imports', () => {
    runs(() => {
      // arrange
      editor = atom.workspace.getActiveTextEditor();
      editor.setText(
        'import { b, c } from \'module\';\n' +
        'import { a, b } from \'module\';\n\n'
      );

      // act
      atom.commands.dispatch(workspaceElement, 'import-organizer:sort');
      waitsForPromise(() => activationPromise);

      // assert
      expect(editor.getText()).toBe(
        'import {\n' +
        '  a,\n' +
        '  b,\n' +
        '  c,\n' +
        '} from \'module\';\n\n'
      );
    });
  });
});
