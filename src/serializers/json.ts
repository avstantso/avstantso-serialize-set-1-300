import { Serializer } from './types';

export const JSONSerializer: Serializer = {
  serialize(set) {
    return JSON.stringify(set);
  },
  deserialize(data) {
    return JSON.parse(data);
  },
};
