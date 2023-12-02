import run from "aocrunner";
import { CONNREFUSED } from "dns";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const cords = input.split("\n").reduce((acc, curr) => {
    const first = curr.match(/[0-9]/g)![0];
    const last = curr.match(/[0-9]/g)!.pop()!;
    const cords = first.toString() + last.toString();
    return acc + parseInt(cords);
  }, 0);

  return cords;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const cords = input.split("\n").reduce((acc, curr) => {
    const dict: { [key: string]: string } = {
      "one": "1",
      "two": "2",
      "three": "3",
      "four": "4",
      "five": "5",
      "six": "6",
      "seven": "7",
      "eight": "8",
      "nine": "9",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9"
    };
    const firstPattern = /(one|two|three|four|five|six|seven|eight|nine|[0-9])/g;
    const lastPattern = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[0-9])/g;
    const first = dict[curr.match(firstPattern)![0]];
    const last = dict[[...curr].reverse().join("").match(lastPattern)![0].split("").reverse().join("")];
    const cords = first + last;
    return acc + parseInt(cords);
  }, 0);

  return cords;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "4dwdwa12",
        expected: 42,
      },
      {
        input: "twodwada4dwadwa",
        expected: 24
      },
      {
        input: "five2323232six",
        expected: 56
      },
      {
        input: "pbkprbzvs819threeonekjpk7brkmbqbkgroneightb",
        expected: 88
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
