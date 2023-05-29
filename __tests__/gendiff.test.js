import gendiff from '../src/gendiff.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('compare JSON files', () => {
  const expected = readFile('result');

  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

  expect(result).toBe(expected);
});

test('compare YAML files', () => {
  const expected = readFile('result');

  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));

  expect(result).toBe(expected);
});