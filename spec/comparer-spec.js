'use babel';

import { compareModules } from '../lib/comparer';

describe('ImportOrganizer', () => {
  describe('compareModules', () => {

    it('should order npm module before a absolute', () => {
      const a = { source: 'mylib' };
      const b = { source: 'mylib/child' };
      expect(compareModules(a, b)).toEqual(-1);
      expect(compareModules(b, a)).toEqual(1);
    });

    it('should order absolute module before a relative', () => {
      const a = { source: 'mylib/child' };
      const b = { source: '../../mylib' };
      expect(compareModules(a, b)).toEqual(-1);
      expect(compareModules(b, a)).toEqual(1);
    });

    it('should order relative module before a local', () => {
      const a = { source: '../../mylib' };
      const b = { source: './mylib' };
      expect(compareModules(a, b)).toEqual(-1);
      expect(compareModules(b, a)).toEqual(1);
    });

  });
});
