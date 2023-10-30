import ACity from '../../common/interfaces/ACity';
import { IAlgorithmResult } from '../../common/interfaces/IAlgorithmResult';

interface Path {
  length: number;
  pheromone: number;
  first_city: number;
  second_city: number;
  NParam: number;
}
interface Ant {
  curCity: number;
  cities: number[];
  path: number;
}
interface PathProbability {
  city: number;
  coefficientH: number;
  probability: number;
}

interface Road {
  cities: number[];
  length: number;
}
function buildPathMatrix(cities: ACity[]): Path[][] {
  const result: Path[][] = [];
  for (let i = 0; i < cities.length; i++) {
    const temp = [];
    for (let j = 0; j < cities.length; j++) {
      const length = Math.sqrt((cities[i].x - cities[j].x) ** 2 + (cities[i].y - cities[j].y) ** 2);
      temp.push({
        length,
        pheromone: 1 / cities.length,
        first_city: cities[i].id,
        second_city: cities[j].id,
        NParam: 1 / length,
      });
    }
    result.push(temp);
  }
  return result;
}
function initAnts(cities: ACity[], antsAmount: number): Ant[] {
  const result = [];
  for (let i = 0; i < cities.length; i++) {
    for (let j = 0; j < antsAmount; j++) {
      result.push({ curCity: i, cities: [i], path: 0 });
    }
  }
  return result;
}

function chooseNextCity(availableCities: PathProbability[]): number {
  let nextCity = -1;
  let counter = 0;
  while (nextCity === -1 && counter < 200) {
    for (let i = 0; i < availableCities.length; i++) {
      if (Math.random() <= availableCities[i].probability) {
        nextCity = availableCities[i].city;
      }
    }
    counter++;
  }
  return nextCity;
}
function comparePathProbability(a: PathProbability, b: PathProbability): number {
  if (a.probability < b.probability) return -1;
  if (a.probability > b.probability) return 1;
  return 0;
}

function makeWays(ants: Ant[], matrix: Path[][], alpha: number, beta: number, Q: number, E: number): void {
  ants.forEach((ant) => {
    let availableCities: PathProbability[] = [];
    let HSum = 0;
    matrix[ant.curCity].forEach((city) => {
      if (!ant.cities.includes(city.second_city)) {
        const coefficientH =
          matrix[city.first_city][city.second_city].pheromone ** alpha +
          matrix[city.first_city][city.second_city].NParam ** beta;
        HSum += coefficientH;
        availableCities.push({ city: city.second_city, coefficientH, probability: 0 });
      }
    });
    // count probability
    availableCities = availableCities.map((city) => ({
      city: city.city,
      probability: city.coefficientH / HSum,
      coefficientH: city.coefficientH,
    }));
    availableCities.sort(comparePathProbability);
    // make choice
    const nextCity = chooseNextCity(availableCities);
    ant.cities.push(nextCity);
    matrix[ant.curCity][nextCity].pheromone += Q / matrix[ant.curCity][nextCity].length;
    matrix[nextCity][ant.curCity].pheromone += Q / matrix[ant.curCity][nextCity].length;
    matrix[ant.curCity][nextCity].pheromone *= E;
    matrix[nextCity][ant.curCity].pheromone *= E;
    ant.curCity = nextCity;
  });
}

function countPath(ant: Ant, roadMatrix: Path[][]): number {
  let result = 0;
  for (let i = 0; i < ant.cities.length - 1; i++) {
    result += roadMatrix[ant.cities[i]][ant.cities[i + 1]].length;
  }
  return result;
}
function chooseBestWay(ants: Ant[], bestWay: Road, roadMatrix: Path[][]): Road {
  const bestPath = { cities: bestWay.cities, length: bestWay.length };
  ants.forEach((ant) => {
    ant.path = countPath(ant, roadMatrix);
    if (ant.path < bestPath.length) {
      bestPath.cities = ant.cities;
      bestPath.length = ant.path;
    }
  });
  return bestPath;
}
export default function useAntColony(
  cities: ACity[],
  alpha: number,
  beta: number,
  Q: number,
  evaporation: number,
  antsAmount: number
): IAlgorithmResult {
  const startTime = performance.now();
  const pathMatrix = buildPathMatrix(cities);
  let ants = initAnts(cities, antsAmount);
  let bestWay: Road = { cities: [], length: 10 ** 10 };
  let bestCounter = 0;
  let iterations = 0;
  while (bestCounter !== 10) {
    iterations += 1;
    ants = initAnts(cities, antsAmount);
    while (ants[0].cities.length !== cities.length) {
      makeWays(ants, pathMatrix, alpha, beta, Q, evaporation);
    }
    const newBestWay = chooseBestWay(ants, bestWay, pathMatrix);
    const newBestLength = newBestWay.length;
    if (newBestLength < bestWay.length) {
      bestWay = newBestWay;
      bestCounter = 0;
    }
    if (newBestWay.length === bestWay.length) bestCounter += 1;
  }
  return {
    path: bestWay.cities,
    time: performance.now() - startTime,
    length: Math.round(bestWay.length),
    iterations,
  };
}
