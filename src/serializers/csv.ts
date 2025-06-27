import { Serializer } from './types';

export const CSVSerializer: Serializer = {
  serialize(set) {
    return set.join();
  },
  deserialize(data) {
    return data.split(',').map((s) => Number.parseInt(s, 10));
  },
};
