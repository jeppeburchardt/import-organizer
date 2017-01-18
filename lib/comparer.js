'use babel';

export const pattern =  /^import.*from\W['|"]([^"']*)['"];?$/gim;

export function moduleOrder(path) {
  if (path.indexOf('/') === -1) {
    return 0;
  } else if (path.indexOf('../') === 0) {
    return 3;
  } else if (path.indexOf('./') === 0) {
    return 4;
  }
  return 1;
}

export function compareModules(a, b) {
  const aType = moduleOrder(a.source);
  const bType = moduleOrder(b.source);
  if (aType !== bType) {
    return Math.max(-1, Math.min(1, aType - bType));
  }
  return a.source.localeCompare(b.source);
}
