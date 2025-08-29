import run from "aocrunner";

const parseInput = (rawInput: string): string[] =>  {
  return rawInput.split(""); 
}

const FLOOR_UP = "(";
const FLOOR_DOWN = ")";

const part1 = (rawInput: string) => {
  const splitInput: string[] = parseInput(rawInput);

  const floorUpCount: number = splitInput.filter(i => i == FLOOR_UP).length;
  const floorDownCount: number = splitInput.filter(i => i == FLOOR_DOWN).length;

  return floorUpCount - floorDownCount;
};

const part2 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput);
  let currentFloor: number = 0;
  for (const [index, character] of input.entries()) {
    if (character == FLOOR_UP) currentFloor++;
    if (character == FLOOR_DOWN) currentFloor--;

    if (currentFloor < 0) {
      // Floor is 0 indexed, we need to add 1.
      return index + 1;
    }
  };
};

run({
  part1: {
    tests: [
      {
        input: `(())`,
        expected: 0,
      },
      {
        input: `()()`,
        expected: 0,
      },
      {
        input: `(((`,
        expected: 3,
      },
      {
        input: `(()(()(`,
        expected: 3,
      },
      {
        input: `))(((((`,
        expected: 3,
      },
      {
        input: `())`,
        expected: -1,
      },
      {
        input: `))(`,
        expected: -1,
      },
      {
        input: `)))`,
        expected: -3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `)`,
        expected: 1,
      },
      {
        input: `()())`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
