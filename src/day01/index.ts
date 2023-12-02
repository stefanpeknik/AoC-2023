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
    const map = new Map<string, string>();
    map.set("one", "1");
    map.set("two", "2");
    map.set("three", "3");
    map.set("four", "4");
    map.set("five", "5");
    map.set("six", "6");
    map.set("seven", "7");
    map.set("eight", "8");
    map.set("nine", "9");
    map.set("1", "1");
    map.set("2", "2");
    map.set("3", "3");
    map.set("4", "4");
    map.set("5", "5");
    map.set("6", "6");
    map.set("7", "7");
    map.set("8", "8");
    map.set("9", "9");
    const firstPattern = /(one|two|three|four|five|six|seven|eight|nine|[0-9])/g;
    const lastPattern = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[0-9])/g;
    const first = map.get(curr.match(firstPattern)![0])!;
    const last = map.get([...curr].reverse().join("").match(lastPattern)![0]!.split("").reverse().join(""))!;
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
