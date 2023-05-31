import yaml from 'js-yaml';

export default (content, extention) => {
  if (extention === '.yml' || extention === '.yaml') {
    return yaml.load(content);
  }
  return JSON.parse(content);
};
