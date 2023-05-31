import diffNodeType from '../difftypes.js';

const toString = (value, depth) => {
  if (!(value instanceof Object)) {
    return `${value}`;
  }
  const result = Object.entries(value).reduce((acc, [key, val]) => {
    return [
      ...acc,
      `${'    '.repeat(depth)}    ${key}: ${toString(val, depth + 1)}\n`,
    ];
  }, []);
  return ['{\n', ...result, '    '.repeat(depth), '}'].join('');
};

const stylish = (diff, depth = 0) => {
  const tabs = '    '.repeat(depth);
  const result = diff.reduce((acc, node) => {
    switch (node.type) {
      case diffNodeType.added:
        return [...acc,
        `${tabs}  + ${node.name}: ${toString(node.value, depth + 1)}\n`,
        ];
      case diffNodeType.deleted:
        return [...acc,
        `${tabs}  - ${node.name}: ${toString(node.value, depth + 1)}\n`,
        ];
      case diffNodeType.unchanged:
        return [...acc,
        `${tabs}    ${node.name}: ${toString(node.value, depth + 1)}\n`,
        ];
      case diffNodeType.modified:
        return [...acc,
        `${tabs}  - ${node.name}: ${toString(node.oldValue, depth + 1)}\n`,
        `${tabs}  + ${node.name}: ${toString(node.newValue, depth + 1)}\n`,
        ];
      case diffNodeType.recursed:
        return [...acc,
        `${tabs}    ${node.name}: ${stylish(node.children, depth + 1)}\n`,
        ];
    }
  }, []);

  return ['{\n', ...result, tabs, '}'].join('');
};

export default stylish;