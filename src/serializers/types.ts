export namespace Serializer {
  export type Set = number[];
}

export type Serializer = {
  serialize(set: Serializer.Set): string;
  deserialize(data: string): Serializer.Set;
};
