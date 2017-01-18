'use babel';

import { pattern } from '../lib/comparer';

describe('ImportOrganizer', () => {
  describe('compareModules', () => {

    it('should find a module import with single quites', () => {
      expect('import Module from \'path\';'.match(pattern)).not.toBe(null) // .toBe('path');
    });

    it('should find a module import with double quites', () => {
      expect('import Module from "path";'.match(pattern)).not.toBe(null) // .toBe('path');
    });

    it('should find a module import with a relative path', () => {
      expect('import Module from "../../path";'.match(pattern)).not.toBe(null) // .toBe('../../path');
    });

    it('should find a module import with an absolute path', () => {
      expect('import Module from "path/folder";'.match(pattern)).not.toBe(null) // .toBe('path/folder');
    });

    it('should find a module import with an local path', () => {
      expect('import Module from "./folder";'.match(pattern)).not.toBe(null) // .toBe('./folder');
    });

    it('should find a module without semi colon', () => {
      expect('import Module from "path"'.match(pattern)).not.toBe(null) // .toBe('path');
    });

    it('should find an unnamed module import', () => {
      expect('import "path";'.match(pattern)).not.toBe(null) // .toBe('path');
    });

    it('should find a module import with a single line comment', () => {
      expect('import Module from "path"; // some comment'.match(pattern)).not.toBe(null) // .toBe('path');
    });

  });
});
