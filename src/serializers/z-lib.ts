import zlib from 'zlib';

import { Serializer } from './types';

export function ZLibSerializer(internal: Serializer): Serializer {
  return {
    serialize(set) {
      return zlib
        .deflateSync(Buffer.from(internal.serialize(set)))
        .toString('binary');
    },
    deserialize(data) {
      return internal.deserialize(
        zlib.inflateSync(Buffer.from(data, 'binary')).toString()
      );
    },
  };
}
