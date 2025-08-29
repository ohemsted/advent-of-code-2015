import run from "aocrunner";
import crypto from "crypto";


const part1 = (rawInput: string) => {
  let outputHash = "";
  let integer = 0;
  while (outputHash.slice(0,5) != "00000") {
    integer++;
    const stringToTest = `${rawInput}${integer}`;
    outputHash = crypto.createHash('md5').update(stringToTest).digest('hex');
  }

  console.log(outputHash);
  return integer;
};

const part2 = (rawInput: string) => {
  let outputHash = "";
  let integer = 0;
  while (outputHash.slice(0,6) != "000000") {
    integer++;
    const stringToTest = `${rawInput}${integer}`;
    outputHash = crypto.createHash('md5').update(stringToTest).digest('hex');
  }

  console.log(outputHash);
  return integer;
};

run({
  part1: {
    tests: [
      {
        input: `abcdef`,
        expected: 609043,
      },
      {
        input: `pqrstuv`,
        expected: 1048970,
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
