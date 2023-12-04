import run from "aocrunner";

type Card = {
  number: number;
  win_nums: number[];
  play_nums: number[];
}

function intersection<T>(array1: T[], array2: T[]): T[] {
  return array1.filter((value) => array2.includes(value));
}

function countCopies(myCard: Card, cards: Card[]): number {
  let count = 0;
  const matches = intersection<number>(myCard.win_nums, myCard.play_nums);
  for (let i = 1; i <= matches.length; i++) {
    const copy = cards.find((card) => card.number == myCard.number + i)!;
    count += 1;
    count += countCopies(copy, cards);
  }
  return count;
}

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => {
    const [card_num_srt, rest] = line.split(": ");
    const card_num = parseInt(card_num_srt.slice(5));
    const [win_nums_str, play_nums_str] = rest.split(" | ");
    const win_nums = win_nums_str.split(" ").map((num) => parseInt(num)).filter((num) => !isNaN(num));
    const play_nums = play_nums_str.split(" ").map((num) => parseInt(num)).filter((num) => !isNaN(num));
    return {
      number: card_num,
      win_nums,
      play_nums,
    };
  }) as Card[];
};

const part1 = (rawInput: string) => {
  const cards = parseInput(rawInput);
  let result = 0;
  cards.forEach((card) => {
    const matches = intersection<number>(card.win_nums, card.play_nums);
    if (matches.length > 0) {
      result += 2 ** (matches.length - 1);
    }
  });
  return result;
};

const part2 = (rawInput: string) => {
  const cards = parseInput(rawInput);
  let count = 0;
  cards.forEach((card) => {
    count += 1;
    count += countCopies(card, cards);
  });
  return count;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
