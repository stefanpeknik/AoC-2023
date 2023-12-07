import run from "aocrunner";

enum Type {
  FiveOfAKind = 7,
  FourOfAKind = 6,
  FullHouse = 5,
  ThreeOfAKind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1
}

const cardToValueMap = new Map<string, number>([
  ["A", 14],
  ["K", 13],
  ["Q", 12],
  ["J", 11],
  ["T", 10],
  ["9", 9],
  ["8", 8],
  ["7", 7],
  ["6", 6],
  ["5", 5],
  ["4", 4],
  ["3", 3],
  ["2", 2]
]);

type Hand = {
  cards: number[];
  type: Type;
  bid: number;
};

function determineType(cards: number[]): Type {
  let cardsPaired: Record<number, number> = {};
  cards.forEach(card => {
    cardsPaired[card] = cardsPaired[card] ? cardsPaired[card] + 1 : 1;
  });

  if (Object.values(cardsPaired).includes(5)) {
    return Type.FiveOfAKind;
  }
  if (Object.values(cardsPaired).includes(4)) {
    return Type.FourOfAKind;
  }
  if (Object.values(cardsPaired).includes(3) && Object.values(cardsPaired).includes(2)) {
    return Type.FullHouse;
  }
  if (Object.values(cardsPaired).includes(3)) {
    return Type.ThreeOfAKind;
  }
  if (Object.values(cardsPaired).filter(v => v === 2).length === 2) {
    return Type.TwoPair;
  }
  if (Object.values(cardsPaired).includes(2)) {
    return Type.OnePair;
  }
  return Type.HighCard;
}

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => {
    const [cardsStr, bid] = line.split(" ");
    const cards = cardsStr.split("").map(c => cardToValueMap.get(c)!);
    return {
      cards: cards,
      type: determineType(cards),
      bid: parseInt(bid)
    };
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const ordered = input.sort((a, b) => {
    if (a.type != b.type) {
      return a.type - b.type;
    }
    for (let i = 0; i < a.cards.length && b.cards.length; i++) {
      if (a.cards[i] != b.cards[i]) {
        return a.cards[i] - b.cards[i];
      }
    }
    return 0; // should never happen
  });

  let result = 0;
  for (let i = 0; i < ordered.length; i++) {
    result += ordered[i].bid * (i + 1);
  }

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
