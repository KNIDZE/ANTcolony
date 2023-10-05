import ACity from '../../common/interfaces/ACity';
import { IAlgorithmResult } from '../../common/interfaces/IAlgorithmResult';

interface PathChild {
  path: number[];
  distance: number;
}
function makeRandomPath(citiesAmount: number): number[] {
  const result: number[] = [];
  const usedNumbers: Set<number> = new Set();

  while (result.length < citiesAmount) {
    const randomNumber: number = Math.floor(Math.random() * citiesAmount);
    if (!usedNumbers.has(randomNumber)) {
      usedNumbers.add(randomNumber);
      result.push(randomNumber);
    }
  }

  return result;
}
function countPathLength(cities: ACity[], path: number[]): number {
  let length = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const cityA = cities[path[i]];
    const cityB = cities[path[i + 1]];
    const distance = Math.sqrt((cityB.x - cityA.x) ** 2 + (cityB.y - cityA.y) ** 2);
    length += distance;
  }
  return Math.round(length);
}
function makeInitialPopulation(maxPopulation: number, cities: ACity[]): PathChild[] {
  const population = [];
  // initial population
  for (let i = 0; i < maxPopulation; i++) {
    const newPath = makeRandomPath(cities.length);
    population.push({
      path: newPath,
      distance: countPathLength(cities, newPath),
    });
  }
  return population;
}

function reproduction(parent1: number[], parent2: number[]): number[] {
  const newPath: number[] = [];
  let parentNumber;
  // for each city in path
  for (let i = 0; i < parent1.length; i++) {
    parentNumber = Math.floor(Math.random());
    // if we choose first parent and if value of current city not in new path
    if (parentNumber === 0 && !newPath.includes(parent1[i])) {
      newPath.push(parent1[i]);
    } else if (parentNumber === 1 && !newPath.includes(parent2[i])) {
      newPath.push(parent1[i]);
    } else {
      // if we didn't find a city in parents - push -1'
      newPath.push(-1);
    }
  }

  return newPath;
}
function getMissedNumber(child: number[]): number[] {
  const result = [];
  for (let i = 0; i < child.length; i++) {
    if (!child.includes(i)) {
      result.push(i);
    }
  }
  return result;
}
function mutation(newPath: number[], mutationsAmount: number, cities: ACity[]): PathChild {
  const result = newPath;
  /*
  If path has empty slots for cities, then if we push numbers there - we can consider that its mutation
  Else - we need to change cities manually
 */
  if (!newPath.includes(-1)) {
    for (let i = 0; i < mutationsAmount; i++) {
      const index = Math.floor(Math.random() * newPath.length);
      let index2 = Math.floor(Math.random() * newPath.length);
      // no repeat
      while (index === index2) {
        index2 = Math.floor(Math.random() * newPath.length);
      }
      [result[index], result[index2]] = [result[index2], result[index]];
    }
  } else {
    while (result.includes(-1)) {
      const missedNumbers = getMissedNumber(result);
      result[newPath.indexOf(-1)] = missedNumbers[Math.floor(Math.random() * missedNumbers.length)];
    }
  }
  return { path: result, distance: countPathLength(cities, result) };
}

export default function useGeneticAlgorithm(
  cities: ACity[],
  maxPopulation: number,
  mutationAmount: number,
  generationAmount: number
): IAlgorithmResult {
  const startTime = performance.now();

  let population = makeInitialPopulation(maxPopulation, cities);
  let newChild;
  for (let i = 0; i < generationAmount; i++) {
    for (let j = 0; j < maxPopulation; j += 1) {
      newChild = reproduction(population[j].path, population[j + 1].path);
      population.push(mutation(newChild, mutationAmount, cities));
    }
    population.sort((a, b) => a.distance - b.distance);
    population = population.slice(0, maxPopulation);
  }
  const { path, distance } = population[0];
  return {
    length: distance,
    path,
    time: performance.now() - startTime,
    iterations: generationAmount,
  };
}
