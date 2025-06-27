import { Serializer } from './types';

export const BytesSerializer: Serializer = {
  serialize(set) {
    const bytes = Uint8Array.from({ length: set.length * 2 }, () => 0);
    for (let i = 0; i < set.length; i++)
      if (set[i] > 0xff) {
        bytes[2 * i + 0] = (set[i] & 0xff) + 1;
        bytes[2 * i + 1] = (set[i] & ~0xff) - 1;
      } else bytes[2 * i + 1] = set[i];

    return [...bytes].map((code) => String.fromCharCode(code)).join('');
  },
  deserialize(data) {
    const bytes = Uint8Array.from(data.split('').map((c) => c.charCodeAt(0)));

    const r = Array.from<number>({ length: Math.floor(bytes.length / 2) });
    for (let i = 0; i < r.length; i++)
      r[i] = bytes[2 * i + 0] + bytes[2 * i + 1];

    return r;
  },
};
