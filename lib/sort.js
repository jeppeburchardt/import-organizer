'use babel';

const moduleOrder = (path) => {
  if (path.indexOf('/') === -1) {
    return 0;
  } else if (path.indexOf('../') === 0) {
    return 3;
  } else if (path.indexOf('./') === 0) {
    return 4;
  }
  return 1;
}

const comparer = (a, b) => {
  const aType = moduleOrder(a.source);
  const bType = moduleOrder(b.source);
  if (aType !== bType) {
    return Math.max(-1, Math.min(1, aType - bType));
  }
  return a.source.localeCompare(b.source);
}

const sort = (imports) => {
  const newList = imports.slice();
  return newList.sort(comparer);
}

export default sort;
