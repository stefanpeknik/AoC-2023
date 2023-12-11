import run from "aocrunner";

const parseInput = (rawInput: string) => {
  let tiles = [] as Tile[][];
  let input = rawInput.split("\n");
  for (let i = 0; i < input.length; i++) {
    tiles.push([]);
    for (let j = 0; j < input[i].length; j++) {
      tiles[i].push({
        x: j,
        y: i,
        Type: input[i][j] as Type,
      });
    }
  }
  return tiles;
};

enum Type {
  Empty = ".",
  Vertical = "|",
  Horizontal = "-",
  TopRight = "L",
  TopLeft = "J",
  DownLeft = "7",
  DownRight = "F",
  Start = "S",
}

type Tile = {
  x: number;
  y: number;
  Type: Type;
};



function findStart(input: Tile[][]) {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x].Type === Type.Start) {
        return input[y][x];
      }
    }
  }
  throw new Error("No start found");
}

function chooseDirection(previous_tile: Tile, current_tile: Tile): { where_to_go_x: number, where_to_go_y: number } | null {
  switch (current_tile.Type) {
    case Type.Horizontal:
      if (previous_tile.x < current_tile.x) {
        return { where_to_go_x: current_tile.x + 1, where_to_go_y: current_tile.y };
      } else if (previous_tile.x > current_tile.x) {
        return { where_to_go_x: current_tile.x - 1, where_to_go_y: current_tile.y };
      }
    case Type.Vertical:
      if (previous_tile.y < current_tile.y) {
        return { where_to_go_x: current_tile.x, where_to_go_y: current_tile.y + 1 };
      } else if (previous_tile.y > current_tile.y) {
        return { where_to_go_x: current_tile.x, where_to_go_y: current_tile.y - 1 };
      }
    case Type.TopLeft:
      if (previous_tile.x < current_tile.x && previous_tile.y == current_tile.y) {
        return { where_to_go_x: current_tile.x, where_to_go_y: current_tile.y - 1 };
      } else if (previous_tile.x == current_tile.x && previous_tile.y < current_tile.y) {
        return { where_to_go_x: current_tile.x - 1, where_to_go_y: current_tile.y };
      }
    case Type.TopRight:
      if (previous_tile.x > current_tile.x && previous_tile.y == current_tile.y) {
        return { where_to_go_x: current_tile.x, where_to_go_y: current_tile.y - 1 };
      } else if (previous_tile.x == current_tile.x && previous_tile.y < current_tile.y) {
        return { where_to_go_x: current_tile.x + 1, where_to_go_y: current_tile.y };
      }
    case Type.DownLeft:
      if (previous_tile.x < current_tile.x && previous_tile.y == current_tile.y) {
        return { where_to_go_x: current_tile.x, where_to_go_y: current_tile.y + 1 };
      } else if (previous_tile.x == current_tile.x && previous_tile.y > current_tile.y) {
        return { where_to_go_x: current_tile.x - 1, where_to_go_y: current_tile.y };
      }
    case Type.DownRight:
      if (previous_tile.x > current_tile.x && previous_tile.y == current_tile.y) {
        return { where_to_go_x: current_tile.x, where_to_go_y: current_tile.y + 1 };
      } else if (previous_tile.x == current_tile.x && previous_tile.y > current_tile.y) {
        return { where_to_go_x: current_tile.x + 1, where_to_go_y: current_tile.y };
      }
    case Type.Start:
    case Type.Empty:
    default:
      null;
  }
  return null;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);
  const paths = [] as Type[][];
  const start = findStart(input);

  const startPoints = [
    { y: start.y - 1, x: start.x },
    { y: start.y + 1, x: start.x },
    { y: start.y, x: start.x - 1 },
    { y: start.y, x: start.x + 1 },
  ];


  for (const startPoint of startPoints) {
    let path = [] as Type[];
    let found_loop = false;
    let reached_end = false;
    let previous_tile = start;
    let y = startPoint.y;
    let x = startPoint.x;
    while (y < input.length && y >= 0) {
      while (x < input[y].length && x >= 0) {
        let current_tile = input[y][x];
        console.log("current_tile", current_tile)
        if (input[y][x].Type === Type.Start) {
          found_loop = true;
          break;
        }
        let next_tile = chooseDirection(previous_tile, current_tile);
        if (next_tile) {
          path.push(current_tile.Type);
          previous_tile = current_tile;
          x = next_tile.where_to_go_x;
          y = next_tile.where_to_go_y;
        } else {
          reached_end = true;
          break;
        }
      }
      if (found_loop) {
        console.log("found_loop", path);
        paths.push(path);
        break;
      };
      if (reached_end) {
        console.log("reached_end");
        break;
      }
    }
  }

  return Math.max(...paths.map(path => Math.ceil(path.length / 2)));
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
        .....
        .S-7.
        .|.|.
        .L-J.
        .....`,
        expected: 4,
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
