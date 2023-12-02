import run from "aocrunner";

type Game = {
  number: number;
  set: Set[];
};

type Set = {
  red: number;
  green: number;
  blue: number;
};

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => {
    const [title, values] = line.split(": ");
    const game_num = parseInt(title.split(" ")[1]);
    const sets: Set[] = values.split("; ").map((s) => {
      const cubes = s.split(", ");
      const set = {
        red: 0,
        green: 0,
        blue: 0,
      };
      cubes.forEach((cube) => {
        const [value, color] = cube.split(" ");
        switch (color) {
          case "red":
            set.red = parseInt(value);
            break;
          case "green":
            set.green = parseInt(value);
            break;
          case "blue":
            set.blue = parseInt(value);
            break;

        };
      });
      return set;
    });
    return {
      number: game_num,
      set: sets,
    } as Game;
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;
  let result = 0;

  input.forEach((game) => {
    let red = 0;
    let green = 0;
    let blue = 0;
    game.set.forEach((set) => {
      red = Math.max(red, set.red);
      green = Math.max(green, set.green);
      blue = Math.max(blue, set.blue);
    });
    if (red <= MAX_RED && green <= MAX_GREEN && blue <= MAX_BLUE) {
      result += game.number;
    }
  });

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;

  input.forEach((game) => {
    let red = 0;
    let green = 0;
    let blue = 0;

    game.set.forEach((set) => {
      red = Math.max(red, set.red);
      green = Math.max(green, set.green);
      blue = Math.max(blue, set.blue);
    });

    result += red * green * blue;
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 3,
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
