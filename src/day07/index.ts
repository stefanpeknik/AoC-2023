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

const cardToValueWithJokerMap = new Map<string, number>([
  ["A", 14],
  ["K", 13],
  ["Q", 12],
  ["T", 10],
  ["9", 9],
  ["8", 8],
  ["7", 7],
  ["6", 6],
  ["5", 5],
  ["4", 4],
  ["3", 3],
  ["2", 2],
  ["J", 1]
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

function determineTypeWithJoker(cards: number[]): Type {
  let cardsPaired: Record<number, number> = {};
  cards.forEach(card => {
    cardsPaired[card] = cardsPaired[card] ? cardsPaired[card] + 1 : 1;
  });

  const { [cardToValueWithJokerMap.get("J")!]: jokerCount, ...cardsPairedWithoutJoker } = cardsPaired;

  console.log(cards, cardsPairedWithoutJoker, jokerCount);

  if (Object.values(cardsPairedWithoutJoker).includes(5) || // 5 of a kind
    Object.values(cardsPairedWithoutJoker).includes(4) && jokerCount === 1 || // 4 of a kind + joker
    Object.values(cardsPairedWithoutJoker).includes(3) && jokerCount === 2 || // 3 of a kind + 2 jokers
    Object.values(cardsPairedWithoutJoker).includes(2) && jokerCount === 3 || // 2 of a kind + 3 jokers
    Object.values(cardsPairedWithoutJoker).includes(1) && jokerCount === 4 || // 1 of a kind + 4 jokers
    jokerCount === 5 // 5 jokers
  ) {
    return Type.FiveOfAKind;
  }
  if (Object.values(cardsPairedWithoutJoker).includes(4) || // 4 of a kind
    Object.values(cardsPairedWithoutJoker).includes(3) && jokerCount === 1 || // 3 of a kind + joker
    Object.values(cardsPairedWithoutJoker).includes(2) && jokerCount === 2 || // 2 of a kind + 2 jokers
    Object.values(cardsPairedWithoutJoker).includes(1) && jokerCount === 3    // 1 of a kind + 3 jokers
  ) {
    return Type.FourOfAKind;
  }
  if (Object.values(cardsPairedWithoutJoker).includes(3) && Object.values(cardsPairedWithoutJoker).includes(2) || // 3 of a kind + 2 of a kind
    Object.values(cardsPairedWithoutJoker).filter(v => v === 2).length === 2 && jokerCount === 1 // 2 of a kind + 2 of a kind + joker
  ) {
    return Type.FullHouse;
  }
  if (Object.values(cardsPairedWithoutJoker).includes(3) || // 3 of a kind
    Object.values(cardsPairedWithoutJoker).includes(2) && jokerCount === 1 || // 2 of a kind + joker
    Object.values(cardsPairedWithoutJoker).includes(1) && jokerCount === 2    // 1 of a kind + 2 jokers
  ) {
    return Type.ThreeOfAKind;
  }
  if (Object.values(cardsPairedWithoutJoker).filter(v => v === 2).length === 2) { // 2 of a kind + 2 of a kind
    return Type.TwoPair;
  }
  if (Object.values(cardsPairedWithoutJoker).includes(2) || // 2 of a kind
    Object.values(cardsPairedWithoutJoker).includes(1) && jokerCount === 1 // 1 of a kind + joker
  ) {
    return Type.OnePair;
  }
  return Type.HighCard;
}

function orderHands(hands: Hand[]): Hand[] {
  return hands.sort((a, b) => {
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
}

function addUpBids(orderedHands: Hand[]): number {
  let result = 0;
  for (let i = 0; i < orderedHands.length; i++) {
    result += orderedHands[i].bid * (i + 1);
  }
  return result;
}

const parseInput1 = (rawInput: string) => {
  return rawInput.split("\n").map(line => {
    const [cardsStr, bid] = line.split(" ");
    const cards = cardsStr.split("").map(c => cardToValueMap.get(c)!);
    return {
      cards: cards,
      type: determineType(cards),
      bid: parseInt(bid)
    } as Hand;
  });
};

const parseInput2 = (rawInput: string) => {
  return rawInput.split("\n").map(line => {
    const [cardsStr, bid] = line.split(" ");
    const cards = cardsStr.split("").map(c => cardToValueWithJokerMap.get(c)!);
    return {
      cards: cards,
      type: determineTypeWithJoker(cards),
      bid: parseInt(bid)
    } as Hand;
  });
};


const part1 = (rawInput: string) => {
  const input = parseInput1(rawInput);;

  return addUpBids(orderHands(input));
};

const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput);

  return addUpBids(orderHands(input));
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
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
