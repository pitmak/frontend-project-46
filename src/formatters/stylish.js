import diffNodeType from '../difftypes.js';

const toString = (value, depth) => {
  if (!(value instanceof Object)) {
    return `${value}`;
  }
  const result = Object.entries(value).reduce((acc, [key, val]) => [
    ...acc,
    `${'    '.repeat(depth)}    ${key}: ${toString(val, depth + 1)}\n`,
  ], []);
  return ['{\n', ...result, '    '.repeat(depth), '}'].join('');
};

const stylish = (diff, depth = 0) => {
  const tabs = '    '.repeat(depth);

  const result = diff.map((node) => {
    switch (node.type) {
      case diffNodeType.added:
        return `${tabs}  + ${node.name}: ${toString(node.value, depth + 1)}`;
      case diffNodeType.deleted:
        return `${tabs}  - ${node.name}: ${toString(node.value, depth + 1)}`;
      case diffNodeType.unchanged:
        return `${tabs}    ${node.name}: ${toString(node.value, depth + 1)}`;
      case diffNodeType.modified:
        return `${tabs}  - ${node.name}: ${toString(node.oldValue, depth + 1)}\n`
          + `${tabs}  + ${node.name}: ${toString(node.newValue, depth + 1)}`;
      case diffNodeType.recursed:
      default:
        return `${tabs}    ${node.name}: ${stylish(node.children, depth + 1)}`;
    }
  });

  return ['{', ...result, `${tabs}}`].join('\n');
};

export default stylish;
