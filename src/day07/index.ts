import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split(`\n`).map((ins) => {
    const [input, output] = ins.split(" -> ");
    return { input, output };
  });
};

const to16bit = (n: number) => n & 0xffff;

const getValue = (
  token: string,
  instructions: Record<string, string>,
  cache: Record<string, number>
): number => {
  if (!isNaN(Number(token))) return to16bit(parseInt(token, 10));

  if (cache[token] !== undefined) return cache[token];

  const expr = instructions[token];
  const value = evaluateInstruction(expr, instructions, cache);

  cache[token] = to16bit(value);
  return cache[token];
};

const evaluateInstruction = (
  input: string,
  instructions: Record<string, string>,
  cache: Record<string, number>
): number => {
  const parts = input.split(" ");

  if (parts.length === 1) {
    const a = parts[0];
    return to16bit(getValue(a, instructions, cache));
  } else if (parts.length === 2) {
    const [op, a] = parts;
    if (op === "NOT") {
      return to16bit(~getValue(a, instructions, cache));
    }
    return to16bit(getValue(a, instructions, cache));
  } else if (parts.length === 3) {
    const [a, op, b] = parts;
    switch (op) {
      case "AND":
        return to16bit(
          getValue(a, instructions, cache) & getValue(b, instructions, cache)
        );
      case "OR":
        return to16bit(
          getValue(a, instructions, cache) | getValue(b, instructions, cache)
        );
      case "LSHIFT":
        return to16bit(
          getValue(a, instructions, cache) << getValue(b, instructions, cache)
        );
      case "RSHIFT":
        return to16bit(
          getValue(a, instructions, cache) >> getValue(b, instructions, cache)
        );
    }
  }
  return 0;
};

const part1 = (rawInput: string) => {
  const instructions: Record<string, string> = {};
  const cache: Record<string, number> = {};

  for (const { input, output } of parseInput(rawInput)) {
    instructions[output] = input;
  }

  return getValue("a", instructions, cache);
};

const part2 = (rawInput: string) => {
  const instructions: Record<string, string> = {};
  const cache: Record<string, number> = {};

  for (const { input, output } of parseInput(rawInput)) {
    instructions[output] = input;
  }

  const aValue = getValue("a", instructions, cache);

  instructions["b"] = String(aValue);

  const newCache: Record<string, number> = {};
  return getValue("a", instructions, newCache);
};

run({
  part1: {
    tests: [
      {
        input: `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
1 -> a`,
        expected: 1,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});