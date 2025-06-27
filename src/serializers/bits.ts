import { Serializer } from './types';

export const BitsSerializer: Serializer = {
  serialize(set) {
    const bytes = new Uint8Array(Math.ceil((set.length * 9) / 8));

    let byte = 0,
      byteI = 0,
      bitI = 0;

    for (const n of set)
      for (let bi = 0; bi <= 8; bi++) {
        byte |= (n & (1 << bi)) > 0 ? 1 << bitI : 0;

        if (++bitI <= 7) continue;

        bytes[byteI] = byte;
        byte = 0;
        byteI++;
        bitI = 0;
      }

    if (bitI) bytes[byteI] = byte;

    return [...bytes].map((code) => String.fromCharCode(code)).join('');
  },
  deserialize(data) {
    const bytes = Uint8Array.from(data.split('').map((c) => c.charCodeAt(0)));
    const set = Array.from<number>({
      length: Math.floor((bytes.length * 8) / 9),
    });

    let num = 0,
      numI = 0,
      bitI = 0;

    for (const byte of bytes)
      for (let bi = 0; bi < 8; bi++) {
        num |= (byte & (1 << bi)) > 0 ? 1 << bitI : 0;

        if (++bitI <= 8) continue;

        set[numI] = num;
        num = 0;
        numI++;
        bitI = 0;
      }

    return set;
  },
};
