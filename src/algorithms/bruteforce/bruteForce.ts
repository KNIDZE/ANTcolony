import ACity from '../../common/interfaces/ACity';
import { IAlgorithmResult } from '../../common/interfaces/IAlgorithmResult';

export default function bruteForce(cities: ACity[]): IAlgorithmResult {
  const startTime = performance.now();
  let bestPathLength = Infinity;
  let bestPath: number[] = [];
  let iterationsAmount = 0;
  const digits: number[] = Array.from({ length: cities.length }, (_, i) => i);
  function generate(prefix: number[] = []): void {
    if (prefix.length === cities.length) {
      let length = 0;
      iterationsAmount += 1;
      for (let i = 0; i < prefix.length - 1; i++) {
        length += Math.sqrt(
          (cities[prefix[i]].x - cities[prefix[i + 1]].x) ** 2 + (cities[prefix[i]].y - cities[prefix[i + 1]].y) ** 2
        );
      }
      if (length < bestPathLength) {
        bestPath = [...prefix];
        bestPathLength = length;
      }
      return;
    }

    for (let i = 0; i < digits.length; i++) {
      if (!prefix.includes(digits[i])) {
        generate([...prefix, digits[i]]);
      }
    }
  }
  generate();
  return {
    length: Math.round(bestPathLength),
    path: bestPath,
    time: performance.now() - startTime,
    iterations: iterationsAmount,
  };
}
