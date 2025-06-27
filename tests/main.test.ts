import 'jest';
import { Serializer, Serializers } from '../src';

const baseSerializers = [
  Serializers.JSONSerializer,
  Serializers.CSVSerializer,
  Serializers.BytesSerializer,
  Serializers.BitsSerializer,
];

const serializers = [
  ...baseSerializers,
  ...baseSerializers.map(Serializers.ZLibSerializer),
];

const baseNames = ['json', 'csv', 'bytes', 'bits'];

const names = [...baseNames, ...baseNames.map((n) => `${n} & z-lib`)];

const MIN = 1,
  MAX = 300,
  COLUMN = 15;

function testSerializers(name: string, set: Serializer.Set) {
  it(name, () => {
    const data = serializers.map(({ serialize, deserialize }, i) => {
      const d = serialize(set);

      try {
        expect(deserialize(d)).toStrictEqual(set);
      } catch {
        expect(names[i]).toBeFalsy();
      }

      return d;
    });

    function line(sep: string, end?: boolean) {
      return `${end ? '╚' : '╠'}${names
        .map(() => '═'.repeat(COLUMN + 2))
        .join(sep)}${end ? '╝' : '╣'}`;
    }

    const header = names.map((n) => n.padEnd(COLUMN)).join(' ║ ');
    const absL = data.map((s) => `${s.length}`.padEnd(COLUMN)).join(' ║ ');
    const ratioL = data
      .map((s) =>
        `${((100 * s.length) / data[0].length).toFixed(2)}%`.padEnd(COLUMN)
      )
      .join(' ║ ');

    console.log(
      [
        `╔${'═'.repeat(header.length + 2)}╗`,
        `║ ${name.padEnd(header.length)} ║`,
        line('╦'),
        `║ ${header} ║`,
        `║ ${absL} ║`,
        `║ ${ratioL} ║`,
        line('╩', true),
        `For: %O\r\n`,
        ...names.map((n, i) => `${n}: ${data[i]}\r\n`),
      ].join('\r\n'),
      set
    );
  });
}

function randomItem() {
  return Math.floor(Math.random() * (MAX - MIN)) + MIN;
}

testSerializers.one = function testSerializersOne(value: number) {
  testSerializers(
    `[${value}]`,
    Array.from({ length: 1 }, () => value)
  );
};

testSerializers.random = function testSerializersRandom(length: number) {
  testSerializers(`random ${length}`, Array.from({ length }, randomItem));
};

testSerializers.digit = function testSerializersDigit(digit: number) {
  const nMin = Math.max(10 * (digit - 1), MIN);
  const nMax = Math.min(10 * digit - 1, MAX);
  const l = nMax - nMin + 1;

  testSerializers(
    `digit ${digit}`,
    Array.from({ length: l * 3 }, (x, i) => nMin + (i % l))
  );
};

describe('main', () => {
  for (const v of [1, 255, 256, 300]) testSerializers.one(v);

  for (const n of [50, 100, 500, 1000]) testSerializers.random(n);

  for (let d = 1; d <= 3; d++) testSerializers.digit(d);
});
