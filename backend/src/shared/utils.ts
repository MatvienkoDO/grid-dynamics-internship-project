export type Pair<First, Second> = [First, Second];
export type Pairs<First, Second> = Array<Pair<First, Second>>;

export function innerJoin<Left, Right>(
  lefts: Left[],
  rights: Right[],
  isPair: (left: Left, right: Right) => boolean,
): Pairs<Left, Right> {

  const pairs: Pairs<Left, Right> = [];

  for (const left of lefts) {
    for (const right of rights) {
      if (isPair(left, right)) {
        pairs.push([left, right]);
      }
    }
  }

  return pairs;
}
