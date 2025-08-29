import run from "aocrunner";

const parseInput = (rawInput: string): {len: number, width: number, height: number}[] =>  {
  const inputArray: string[] = rawInput.split(`\n`);
  const presents: {len: number, width: number, height: number}[] = inputArray.map(input => {
    const split: number[] = input.split('x').map(i => parseInt(i, 10));
    return {
      len: split[0],
      width: split[1],
      height: split[2]
    }
  });
  return presents;
};

const part1 = (rawInput: string) => {
  const presents: {len: number, width: number, height: number}[] = parseInput(rawInput);

  let totalWrapping = 0;
  for (const present of presents) {
    const l = present.len;
    const w = present.width;
    const h = present.height;

    const wrapping = 2*l*w + 2*w*h + 2*h*l + Math.min(l*w, w*h, h*l)
    totalWrapping += wrapping;
  }
  return totalWrapping;
};

const part2 = (rawInput: string) => {
  const presents: {len: number, width: number, height: number}[] = parseInput(rawInput);

  let totalRibbon = 0;
  for (const present of presents) {
    const l = present.len;
    const w = present.width;
    const h = present.height;

    // face perimeters
    const smallestPerimeter = Math.min(((2*l) + (2*w)), ((2*w) + (2*h)), ((2*h) + (2*l)));

    // shorted distance
    const shortestDistance = Math.min(2*(l+h), 2*(w+l), 2*(w+h));

    const boxRibbon = Math.min(smallestPerimeter, shortestDistance);
    const bowRibbon: number = l*w*h;
    totalRibbon += (boxRibbon + bowRibbon);
  }
  return totalRibbon;
};

run({
  part1: {
    tests: [
      {
        input: `2x3x4`,
        expected: 58,
      },
      {
        input: `1x1x10`,
        expected: 43,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2x3x4`,
        expected: 34,
      },
      {
        input: `1x1x10`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
