import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('compare JSON files: stylish', () => {
  const expected = readFile('result_stylish');

  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');

  expect(result).toBe(expected);
});

test('compare YAML files: plain', () => {
  const expected = readFile('result_plain');

  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');

  expect(result).toBe(expected);
});

test('compare mix files: json', () => {
  const expected = readFile('result_json');

  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'json');

  expect(result).toBe(expected);
});

test('compare mix files: default', () => {
  const expected = readFile('result_stylish');

  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'));

  expect(result).toBe(expected);
});
