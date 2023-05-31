import sortBy from 'lodash/sortBy.js';
import diffNodeType from './difftypes.js';

const buildDiff = (obj1, obj2) => {
  const merged = { ...obj1, ...obj2 };

  return sortBy(Object.keys(merged)).map((key) => {
    if (key in obj1 && key in obj2) {
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        return {
          name: key,
          type: diffNodeType.recursed,
          children: buildDiff(obj1[key], obj2[key]),
        };
      }
      if (obj1[key] === obj2[key]) {
        return {
          name: key,
          type: diffNodeType.unchanged,
          value: obj1[key],
        };
      }
      return {
        name: key,
        type: diffNodeType.modified,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    if (key in obj1) {
      return {
        name: key,
        type: diffNodeType.deleted,
        value: obj1[key],
      };
    }
    return {
      name: key,
      type: diffNodeType.added,
      value: obj2[key],
    };
  });
};

export default buildDiff;
