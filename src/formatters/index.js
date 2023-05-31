import stylish from './stylish';
import plain from './plain';
import json from './json';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return '';
  }
};
