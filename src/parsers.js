import yaml from 'js-yaml';

export default (content, extention) => {
  switch (extention.toLowerCase()) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    default:
      return {};
  }
};
