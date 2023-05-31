import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const testRun = (filename1, filename2, expectedFilename, format) => {
  const expected = readFile(expectedFilename);

  const result = gendiff(getFixturePath(filename1), getFixturePath(filename2), format);

  expect(result).toBe(expected);
};

test('compare JSON files: stylish', () => {
  testRun('file1.json', 'file2.json', 'result_stylish', 'stylish');
});

test('compare YAML files: stylish', () => {
  testRun('file1.yaml', 'file2.yaml', 'result_stylish', 'stylish');
});

test('compare JSON files: plain', () => {
  testRun('file1.json', 'file2.json', 'result_plain', 'plain');
});

test('compare YAML files: plain', () => {
  testRun('file1.yaml', 'file2.yaml', 'result_plain', 'plain');
});

test('compare JSON files: json', () => {
  testRun('file1.json', 'file2.json', 'result_json', 'json');
});

test('compare YAML files: json', () => {
  testRun('file1.yaml', 'file2.yaml', 'result_json', 'json');
});

test('compare mix files: default', () => {
  testRun('file1.yaml', 'file2.json', 'result_stylish');
});
