import path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import parse from './parsers.js';

export default (filepath1, filepath2) => {
  const content1 = readFileSync(path.resolve(cwd(), filepath1), 'utf-8');
  const content2 = readFileSync(path.resolve(cwd(), filepath2), 'utf-8');

  const obj1 = parse(content1, path.extname(filepath1));
  const obj2 = parse(content2, path.extname(filepath2));

  const merged = { ...obj1, ...obj2 };

  const diff = Object.keys(merged).sort().reduce((acc, key) => {
    if (key in obj1 && key in obj2) {
      if (obj1[key] == obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}`];
      }

      return [
        ...acc,
        `  - ${key}: ${obj1[key]}`,
        `  + ${key}: ${obj2[key]}`,
      ];
    }

    if (key in obj1) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }

    if (key in obj2) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
  }, []);

  return ['{', ...diff, '}'].join('\n');
};