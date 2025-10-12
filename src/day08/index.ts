import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split('\n')
};

const part1 = (rawInput: string) => {
  const strings = parseInput(rawInput);
  let diff = 0;
  for (const string of strings) {
    diff += string.length - eval(string).length
  }

  return diff;
};

const part2 = (rawInput: string) => {
  const strings = parseInput(rawInput);
  let diff = 0;
  for (const string of strings) {
    diff += JSON.stringify(string).length - string.length
  }

  return diff;
};

run({
  part1: {
    tests: [
      {
        input: `""`,
        expected: 2,
      },
      {
        input: `"abc"`,
        expected: 2,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `""`,
        expected: 4,
      },
      {
        input: `"abc"`,
        expected: 4,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
