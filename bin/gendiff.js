#!/usr/bin/env node

// eslint-disable-next-line no-undef
import { Option, program } from 'commander';

import gendiff from '../src/gendiff';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.\n'
    + 'Support JSON and YAML input file formats.')
  .version('1.0.0')
  .argument('<filepath1>', 'first file to compare')
  .argument('<filepath2>', 'second file to compare')
  .addOption(new Option('-f, --format <type>', 'output format')
    .choices(['stylish', 'plain', 'json'])
    .default('stylish'))
  .action((filepath1, filepath2, options) => {
    console.log(gendiff(filepath1, filepath2, options.format));
  });

program.parse();
