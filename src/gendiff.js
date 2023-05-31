import path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';

import parse from './parsers.js';
import buildDiff from './builddiff.js';
import applyFormatter from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = readFileSync(path.resolve(cwd(), filepath1), 'utf-8');
  const content2 = readFileSync(path.resolve(cwd(), filepath2), 'utf-8');

  const obj1 = parse(content1, path.extname(filepath1));
  const obj2 = parse(content2, path.extname(filepath2));

  const diff = buildDiff(obj1, obj2);

  return applyFormatter(diff, format);
};
