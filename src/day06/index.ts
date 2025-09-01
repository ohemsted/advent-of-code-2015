import run from "aocrunner";

type Point = {
  x: number;
  y: number;
};

type Instruction = {
  instruction: string;
  start: Point;
  end: Point;
};

function parseInstruction(str: string): Instruction {
  const regex = /^(.+?)\s+(\d+),(\d+)\s+through\s+(\d+),(\d+)$/;
  const match = str.trim().match(regex);

  if (!match) {
    throw new Error("Invalid format");
  }
  
  const [, instruction, startX, startY, endX, endY] = match;
  
  return {
    instruction: instruction,
    start: { x: parseInt(startX, 10), y: parseInt(startY, 10) },
    end: { x: parseInt(endX, 10), y: parseInt(endY, 10) },
  };
}

const parseInput = (rawInput: string) => {
  return rawInput.split(`\n`).map(instruction => {
    return parseInstruction(instruction);
  });
};

const createGrid = (gridSize: number = 1000): number[][] => {
  const grid = [];

  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  return grid;
}

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput);
  const grid = createGrid();

  for (const instruction of instructions) {
    for (let x = instruction.start.x; x <= instruction.end.x; x++) {
      for (let y = instruction.start.y; y <= instruction.end.y; y++) {
        switch (instruction.instruction) {
          case "turn on":
            grid[x][y] = 1;
            break;
          case "turn off":
            grid[x][y] = 0;
            break;
          case "toggle":
            grid[x][y] = grid[x][y] === 1 ? 0 : 1;
            break;
        }
      }
    }
  }
  
  // Count how many lights are on
  let count = 0;
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      if (grid[x][y] === 1) count++;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput);
  const grid = createGrid();

  for (const instruction of instructions) {
    for (let x = instruction.start.x; x <= instruction.end.x; x++) {
      for (let y = instruction.start.y; y <= instruction.end.y; y++) {
        switch (instruction.instruction) {
          case "turn on":
            grid[x][y] += 1;
            break;
          case "turn off":
            if (grid[x][y] != 0) grid[x][y] -= 1;
            break;
          case "toggle":
            grid[x][y] += 2;
            break;
        }
      }
    }
  }
  
  // Count how many lights are on
  let count = 0;
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      if (grid[x][y] > 0) count += grid[x][y];
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `turn on 0,0 through 999,999`,
        expected: 1000000,
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
