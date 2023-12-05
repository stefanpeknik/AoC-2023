import run from "aocrunner";

type Input = {
  seeds: number[];
  seedToSoil: Map[];
  soilToFertilizer: Map[];
  fertilizerToWater: Map[];
  waterToLight: Map[];
  lightToTemperature: Map[];
  temperatureToHumidity: Map[];
  humidityToLocation: Map[];
};

type Map = {
  dst_start: number;
  src_start: number;
  len: number;
};

const parseInput = (rawInput: string) => {
  let seeds: number[] = [];
  let seedToSoil: Map[] = [];
  let soilToFertilizer: Map[] = [];
  let fertilizerToWater: Map[] = [];
  let waterToLight: Map[] = [];
  let lightToTemperature: Map[] = [];
  let temperatureToHumidity: Map[] = [];
  let humidityToLocation: Map[] = [];

  let lines = rawInput.split("\n");

  // Parse seeds (skip "seeds: ")
  seeds = lines[0].substring(7).split(" ").map((s) => parseInt(s));
  // Parse seed-to-soil map
  seedToSoil = parseMap("seed-to-soil map", lines);
  // Parse soil-to-fertilizer map
  soilToFertilizer = parseMap("soil-to-fertilizer map", lines);
  // Parse fertilizer-to-water map
  fertilizerToWater = parseMap("fertilizer-to-water map", lines);
  // Parse water-to-light map
  waterToLight = parseMap("water-to-light map", lines);
  // Parse light-to-temperature map
  lightToTemperature = parseMap("light-to-temperature map", lines);
  // Parse temperature-to-humidity map
  temperatureToHumidity = parseMap("temperature-to-humidity map", lines);
  // Parse humidity-to-location map
  humidityToLocation = parseMap("humidity-to-location map", lines);

  const input: Input = {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  };
  console.log(input);

  return input;
};

function parseMap(mapName: string, lines: string[]) {
  let index = lines.findIndex((line) => line.includes(mapName));
  let map: Map[] = [];
  while (lines[++index] && lines[++index] != "") {
    const [dst_start, src_start, len] = lines[index].split(" ").map((s) => parseInt(s));
    map.push({ dst_start, src_start, len });
  }
  return map;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  

  return;
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
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: "",
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
  onlyTests: true,
});
