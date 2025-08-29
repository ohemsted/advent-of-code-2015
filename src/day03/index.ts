import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("").map((d) => {
    switch (d) {
      case '^': 
        return {x: 0, y:1 }
      case '<': 
        return {x: -1, y: 0}
      case '>': 
        return {x: 1, y:0}
      case 'v': 
        return {x: 0, y:-1}
      default: 
        console.log("Unknown Direction?")
        return {x: 0, y: 0}
    }
  })
};

const part1 = (rawInput: string) => {
  const directions = parseInput(rawInput);
  let currentLocation = {x: 0, y:0};

  const visitedLocations: {x: number, y: number}[] = [];
  visitedLocations.push(structuredClone(currentLocation));
  
  for (const direction of directions) {
    currentLocation.x += direction.x;
    currentLocation.y += direction.y;
    visitedLocations.push(structuredClone(currentLocation));
  }

  const uniqueLocations = visitedLocations.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === visitedLocations.findIndex(obj => {
      return JSON.stringify(obj) === _value;
    });
  });

  return uniqueLocations.length;
};

const part2 = (rawInput: string) => {
  const directions = parseInput(rawInput);
  let santaCurrentLocation = {x: 0, y:0};
  let roboCurrentLocation = {x: 0, y:0};
  let isSantaDelivering = true;

  const visitedLocations: {x: number, y: number}[] = [];
  visitedLocations.push(structuredClone(santaCurrentLocation));
  visitedLocations.push(structuredClone(roboCurrentLocation));
  
  for (const direction of directions) {
    if (isSantaDelivering) {
      isSantaDelivering = false;
      santaCurrentLocation.x += direction.x;
      santaCurrentLocation.y += direction.y;
      visitedLocations.push(structuredClone(santaCurrentLocation));
    } else {
      isSantaDelivering = true;
      roboCurrentLocation.x += direction.x;
      roboCurrentLocation.y += direction.y;
      visitedLocations.push(structuredClone(roboCurrentLocation));
    }
  }

  const uniqueLocations = visitedLocations.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === visitedLocations.findIndex(obj => {
      return JSON.stringify(obj) === _value;
    });
  });

  return uniqueLocations.length;
};

run({
  part1: {
    tests: [
      {
        input: `>`,
        expected: 2,
      },
      {
        input: `^>v<`,
        expected: 4,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `^v`,
        expected: 3,
      },
      {
        input: `^>v<`,
        expected: 3,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 11,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
