import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => {
    return line.split("");
  });
};


function isCharNumber(char: string): boolean {
  return !isNaN(Number(char));
}
/**
 * 
 * @param indexes  indexes of the number
 * @param array  2d array to search in
 * @returns  true if any symbol is adjecent to the number
 */
function AnyAdjecentSymbolTo(indexes: { i: number, j: number }[], array: string[][]): boolean {
  for (let i = indexes[0].i - 1; i <= indexes[indexes.length - 1].i + 1; i++) { // start one to top from number and end one to bottom from indexes
    for (let j = indexes[0].j - 1; j <= indexes[indexes.length - 1].j + 1; j++) { // start one to left from number and end one to right from indexes
      if (indexes.some((index) => index.i === i && index.j === j)) { // skip over given indexes
        continue;
      }
      if (array[i] && array[i][j] && // check if index exists 
        !isCharNumber(array[i][j]) && // ignore potential exceptions where numbers are next to each other (diagonal / vertical) 
        array[i][j] !== '.' // ignore periods '.'
      ) {
        return true;
      }
    }
  }
  return false;
};

/**
 * 
 * @param symbol  symbol to search around
 * @param array  2d array to search in
 * @returns  array of numbers around the symbol
 */
function FindNumbersAround(symbol: { i: number, j: number }, array: string[][]): number[] {
  const numbers: number[] = [];

  // top line
  // xxx
  //  $
  for (let j = 0; j < array[symbol.i - 1].length; j++) {
    if (isCharNumber(array[symbol.i - 1][j])) { // found start of number
      let num_str = "";
      let start = j;
      while (isCharNumber(array[symbol.i - 1][j])) { // find end of number
        num_str += array[symbol.i - 1][j];
        j++;
      }
      j--; // go back one step where the number really ended
      let end = j;
      // [start, end] U [symbol.j - 1, symbol.j + 1] != empty
      if (start <= symbol.j + 1 && end >= symbol.j - 1) {
        numbers.push(parseInt(num_str));
      }
    }
  }

  // left side
  // x$
  if (isCharNumber(array[symbol.i][symbol.j - 1])) {
    let j = symbol.j - 1;
    let num_str_reversed = "";
    while (array[symbol.i][j] && isCharNumber(array[symbol.i][j])) {
      num_str_reversed += array[symbol.i][j];
      j--;
    }
    const num_str = num_str_reversed.split("").reverse().join("");
    numbers.push(parseInt(num_str));
  }

  // right side
  // $x
  if (isCharNumber(array[symbol.i][symbol.j + 1])) {
    let j = symbol.j + 1;
    let num_str = "";
    while (array[symbol.i][j] && isCharNumber(array[symbol.i][j])) {
      num_str += array[symbol.i][j];
      j++;
    }
    numbers.push(parseInt(num_str));
  }

  // bottom line
  //  $
  // xxx
  for (let j = 0; j < array[symbol.i + 1].length; j++) {
    if (isCharNumber(array[symbol.i + 1][j])) { // found start of number
      let num_str = "";
      let start = j;
      while (isCharNumber(array[symbol.i + 1][j])) { // find end of number
        num_str += array[symbol.i + 1][j];
        j++;
      }
      j--; // go back one step where the number really ended
      let end = j;
      // [start, end] U [symbol.j - 1, symbol.j + 1] != empty
      if (start <= symbol.j + 1 && end >= symbol.j - 1) {
        numbers.push(parseInt(num_str));
      }
    }
  }

  return numbers;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (isCharNumber(input[i][j])) { // find first number char of a number
        let num_str = ""; // start building the number
        let num_indexes: { i: number, j: number }[] = []; // save the indexes of the number
        while (j < input[i].length && isCharNumber(input[i][j])) { // find the rest of the number
          num_str += input[i][j];
          num_indexes.push({ i, j });
          j++;
        }
        if (AnyAdjecentSymbolTo(num_indexes, input)) {
          const num = parseInt(num_str); // convert to number
          result += num; // add to result
        }
      }
    }
  }

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == '*') { // symbol '*'
        const numbers = FindNumbersAround({ i, j }, input);
        if (numbers.length == 2) {
          result += numbers[0] * numbers[1];
        }
      }
    }
  }

  return result;
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
