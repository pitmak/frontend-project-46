#!/usr/bin/env node

// eslint-disable-next-line no-undef
const { program } = require('commander');

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'first file to compare')
  .argument('<filepath2>', 'second file to compare')
  .option('-f, --format <type>', 'output format');

program.parse();
