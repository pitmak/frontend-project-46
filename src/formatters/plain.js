import diffNodeType from '../difftypes.js';

const toString = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (diff, parent = '') => {
  const result = diff.reduce((acc, node) => {
    const begin = `Property '${parent}${node.name}' was`;
    switch (node.type) {
      case diffNodeType.added:
        return [
          ...acc,
          `${begin} added with value: ${toString(node.value)}`,
        ];
      case diffNodeType.deleted:
        return [
          ...acc,
          `${begin} removed`,
        ];
      case diffNodeType.modified:
        return [
          ...acc,
          `${begin} updated. From ${toString(node.oldValue)} to ${toString(node.newValue)}`,
        ];
      case diffNodeType.recursed: {
        const newParent = `${parent}${node.name}.`;
        const childNodes = plain(node.children, newParent);
        return [...acc, childNodes];
      }
      default:
        return acc;
    }
  }, []);

  return result.join('\n');
};

export default plain;
