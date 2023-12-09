import run from "aocrunner";


function predictNext(history: number[]): number {
  let arrs: number[][] = [history];

  for (let arr = history; arr.filter((x) => x == 0).length != arr.length;) {
    arr = calcDiffs(arr);
    arrs.push(arr);
  }

  arrs[arrs.length - 1].push(0);

  for (let i = arrs.length - 1; i >= 0; i--) {
    if (i == 0) {
      const predicted = arrs[0][arrs[0].length - 1];
      return predicted;
    }
    let down = arrs[i][arrs[i].length - 1];
    let left = arrs[i - 1][arrs[i - 1].length - 1];
    arrs[i - 1].push(down + left);
  }
  return 0; // should never happen
};

function predictPrevious(history: number[]): number {
  let arrs: number[][] = [history];

  for (let arr = history; arr.filter((x) => x == 0).length != arr.length;) {
    arr = calcDiffs(arr);
    arrs.push(arr);
  }

  arrs[arrs.length - 1] = [0, ...arrs[arrs.length - 1]];

  for (let i = arrs.length - 1; i >= 0; i--) {
    if (i == 0) {
      const predicted = arrs[0][0];
      return predicted;
    }
    let down = arrs[i][0];
    let right = arrs[i - 1][0];
    arrs[i - 1] = [right - down, ...arrs[i - 1]];
  }
  return 0; // should never happen
};

function calcDiffs(history: number[]): number[] {
  const diffs = [];

  for (let i = 1; i < history.length; i++) {
    diffs.push(history[i] - history[i - 1]);
  }

  return diffs;
}

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => { return line.split(" ").map(Number); });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, line) => {
    return acc + predictNext(line);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, line) => {
    return acc + predictPrevious(line);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
