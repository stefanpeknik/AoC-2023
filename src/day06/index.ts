import run from "aocrunner";

type Race = {
  time: number;
  wrDis: number;
};

function countPossibleWins(race: Race): number {
  let wins = 0;
  for (let hold = 0; hold <= race.time; hold++) {
    if (hold * (race.time - hold) > race.wrDis) {
      wins++;
    }
  }
  return wins;
}

const parseInput = (rawInput: string) => {
  const [timeLine, wrDisLine] = rawInput.split("\n");
  const times = timeLine.split(':')[1]
    .split(' ').map((s) => parseInt(s))
    .filter((n) => !isNaN(n));
  const wrDises = wrDisLine.split(':')[1]
    .split(' ').map((s) => parseInt(s))
    .filter((n) => !isNaN(n));
  const races: Race[] = [];
  for (let i = 0; i < times.length && wrDises.length; i++) {
    races.push({
      time: times[i],
      wrDis: wrDises[i],
    });
  }
  return races;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let res = 1;
  for (let race of input) {
    res *= countPossibleWins(race);
  }
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const race = input.reduce((acc, curr) => {
    return {
      time: parseInt(acc.time + "" + curr.time),
      wrDis: parseInt(acc.wrDis + "" + curr.wrDis),
    };
  }, { time: 0, wrDis: 0 });

  return countPossibleWins(race);
};

run({
  part1: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200`,
        expected: 288,
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
