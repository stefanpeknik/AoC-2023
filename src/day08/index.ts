import run from "aocrunner";

type Input = {
  instructions: string[];

  networks: Network[];
};

type Network = {
  current: string;
  pair: Pair;
}

type Pair = {
  left: string;
  right: string;
}


function gcd(a: number, b: number): number {
  return b == 0 ? a : gcd(b, a % b)
}
const lcm = (a: number, b: number) => a / gcd(a, b) * b
const lcmAll = (ns: number[]) => ns.reduce(lcm, 1)


const parseInput = (rawInput: string) => {
  const [instructions, , ...networks] = rawInput.split("\n");
  return {
    instructions: instructions.split(""),
    networks: networks.map((network) => {
      return {
        current: network.substring(0, 3),
        pair: {
          left: network.substring(7, 10),
          right: network.substring(12, 15),
        },
      }
    })
  } as Input;
};

function chooseDirection(pair: Pair, direction: string): string {
  if (direction == "L") {
    return pair.left;
  } else {
    return pair.right;
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let steps = 0;
  let current = input.networks.find((network) => network.current == "AAA")!.current;
  for (let i = 0; i < input.instructions.length; i = ++i % input.instructions.length) {
    if (current == "ZZZ") {
      break;
    }
    const currentNetwork = input.networks.find((network) => network.current == current)!;
    current = chooseDirection(currentNetwork.pair, input.instructions[i]);
    steps++;
  }
  return steps;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let currentPositions = input.networks.reduce((acc, network) => {
    if (network.current[2] == "A") {
      acc.push(network.current);
    }
    return acc;
  }, [] as string[]);

  let stepsTaken: number[] = [];

  for (let pos of currentPositions) {
    let steps = 0;
    for (let i = 0; i < input.instructions.length; i = ++i % input.instructions.length) {
      if (pos[2] == 'Z') {
        break;
      }
      const currentNetwork = input.networks.find((network) => network.current == pos)!;
      pos = chooseDirection(currentNetwork.pair, input.instructions[i]);
      steps++;
    }
    stepsTaken.push(steps);
  }
  return lcmAll(stepsTaken);
};

run({
  part1: {
    tests: [
      {
        input: `
        RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
