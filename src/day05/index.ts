import run from "aocrunner";

const parseInput = (rawInput: string): string[] => {
  return rawInput.split(`\n`);
};

const containsBannedString = (input: string): boolean => {
  let matched = 0;
  for (const bannedString of ['ab', 'cd', 'pq', 'xy']) {
    matched += input.indexOf(bannedString) == -1 ? 0 : 1;
  }

  return Boolean(matched);
}

const numberOfVowels = (input: string): number => {
  return (input.match(/[aeiou]/gi) || []).length;
}

const hasPairs = (input: string): boolean => {
  return Boolean((input.match(/(.)\1/g))?.length ?? 0)
}

const hasSplitPairs = (input: string): boolean => {
  return Boolean((input.match(/([a-zA-Z]).\1/g))?.length ?? 0)
}

const hasDualPairs = (input: string): boolean => {
  return Boolean((input.match(/(..).*\1/g))?.length ?? 0)
}


const part1 = (rawInput: string) => {
  const inputs = parseInput(rawInput);
  let numberOfMatches = 0
  for (const input of inputs) {
    console.log(`containsBannedString(input) ${containsBannedString(input)}`);
    console.log(`numberOfVowels(input) ${numberOfVowels(input)}`)
    console.log(`hasPairs(input) ${hasPairs(input)}`)
    if (!containsBannedString(input) && numberOfVowels(input) >= 3 && hasPairs(input)) {
      numberOfMatches++;
    }
  }
  return numberOfMatches;
};

const part2 = (rawInput: string) => {
  const inputs = parseInput(rawInput);
  let numberOfMatches = 0
  for (const input of inputs) {
    console.log(`hasDualPairs(input) ${hasDualPairs(input)}`)
    console.log(`hasSplitPairs(input) ${hasSplitPairs(input)}`)
    if (hasDualPairs(input) && hasSplitPairs(input)) {
      numberOfMatches++;
    }
  }
  return numberOfMatches;
};

run({
  part1: {
    tests: [
      {
        input: `ugknbfddgicrmopn`,
        expected: 1,
      },
      {
        input: `aaa`,
        expected: 1,
      },
      {
        input: `jchzalrnumimnmhp`,
        expected: 0,
      },
      {
        input: `haegwjzuvuyypxyu`,
        expected: 0,
      },
      {
        input: `dvszwmarrgswjxmb`,
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `qjhvhtzxzqqjkmpb`,
        expected: 1,
      },
      {
        input: `xxyxx`,
        expected: 1,
      },
      {
        input: `uurcxstgmygtbstg`,
        expected: 0,
      },
      {
        input: `ieodomkazucvgmuy`,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
