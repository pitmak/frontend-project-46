import diffNodeType from './difftypes.js';

const buildDiff = (obj1, obj2) => {
  const merged = { ...obj1, ...obj2 };

  return Object.keys(merged).sort().reduce((acc, key) => {
    const newNode = { name: key };

    if (key in obj1 && key in obj2) {
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        newNode.type = diffNodeType.recursed;
        newNode.children = buildDiff(obj1[key], obj2[key]);
      } else if (obj1[key] === obj2[key]) {
        newNode.type = diffNodeType.unchanged;
        newNode.value = obj1[key];
      } else {
        newNode.type = diffNodeType.modified;
        newNode.oldValue = obj1[key];
        newNode.newValue = obj2[key];
      }
    } else if (key in obj1) {
      newNode.type = diffNodeType.deleted;
      newNode.value = obj1[key];
    } else if (key in obj2) {
      newNode.type = diffNodeType.added;
      newNode.value = obj2[key];
    }

    return [...acc, newNode];
  }, []);
};

export default buildDiff;