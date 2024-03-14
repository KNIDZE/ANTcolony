import React, { useEffect, useState } from 'react';
import './options.css';
import { useDispatch, useSelector } from 'react-redux';
import ACity from '../../../../common/interfaces/ACity';
import { OptionsProps } from '../../../../common/interfaces/IOptions';
import { AlgorithmSelection } from './AlgorithmSelector/AlgorithmSelection';
import bruteForce from '../../../../algorithms/bruteforce/bruteForce';
import useAntColony from '../../../../algorithms/antcolony/ant_colony';
import { IAlgorithmResult } from '../../../../common/interfaces/IAlgorithmResult';
import { drawShortestPath } from '../board/boardDrawFunctions';
import useGeneticAlgorithm from '../../../../algorithms/genetic/geneticAlgorithm';
import { addCitiesToStore, setEntMovement } from '../../../../store/actions';

interface GeneratorOptions {
  amount: number;
  maxLength: number;
}
const mapStateToProps = (state: OptionsProps): OptionsProps => ({
  propsCities: state.cities,
  algorithm: state.algorithm,
  cities: state.cities,
  antCoefficients: state.antCoefficients,
  geneticOptions: state.geneticOptions,
});

function generateRandomCities(options: GeneratorOptions): ACity[] {
  const result: ACity[] = [];
  let x = Math.floor(Math.random() * 900);
  let y = Math.floor(Math.random() * 500);
  result.push({
    x,
    y,
    id: 0,
    position: 1,
  });
  for (let i = 1; i < options.amount; i++) {
    x = Math.floor(Math.random() * 900);
    y = Math.floor(Math.random() * 500);
    result.push({ x, y, position: result.length + 1, id: result.length });
  }
  return result;
}
export default function Options(): React.ReactElement {
  const dispatch = useDispatch();
  const { propsCities, algorithm, geneticOptions, antCoefficients } = useSelector(mapStateToProps);
  const [cities, setCities] = useState(propsCities);
  const [algorithmResult, setAlgorithmResult] = useState<IAlgorithmResult>();
  const [generationOptions, setGenerationOptions] = useState({ amount: 20, maxLength: 1000 });

  const cityGeneration = (): void => {
    addCitiesToStore(dispatch, generateRandomCities(generationOptions));
  };
  useEffect(() => setCities(propsCities), [propsCities]);
  function findPath(): void {
    let result: IAlgorithmResult = {
      path: [],
      iterations: 0,
      length: 0,
      time: 0,
    };
    if (algorithm === 'Genetic') {
      result = useGeneticAlgorithm(
        cities,
        geneticOptions.populationSize,
        geneticOptions.mutationAmount,
        geneticOptions.generationAmount
      );
    }
    if (algorithm === 'Brute') {
      result = bruteForce(cities);
    }
    if (algorithm === 'ACO') {
      result = useAntColony(
        cities,
        antCoefficients.alpha,
        antCoefficients.beta,
        antCoefficients.Q,
        antCoefficients.evaporation,
        antCoefficients.antsAmount
      );
    }
    setAlgorithmResult(result);
    setEntMovement(dispatch, true);
    drawShortestPath(cities, result.path);
    setTimeout((): void => {
      setEntMovement(dispatch, false);
    }, 1500);
  }
  return (
    <div className="options">
      <h2>Налаштування</h2>
      <AlgorithmSelection />
      <form className="options_form">
        <div className="option">
          <label>Кількість:</label>
          <input
            type="number"
            defaultValue={20}
            min={0}
            onChange={(e): void =>
              setGenerationOptions({
                amount: +e.currentTarget.value,
                maxLength: generationOptions.maxLength,
              })
            }
          />
        </div>
        <div className="option">
          <label>Максимальна відстань:</label>
          <input
            type="number"
            defaultValue={1000}
            min={0}
            onChange={(e): void =>
              setGenerationOptions({
                amount: generationOptions.amount,
                maxLength: +e.currentTarget.value,
              })
            }
          />
        </div>
        <button
          className="main_button_style city_generation_button"
          onClick={(e): void => {
            cityGeneration();
            e.preventDefault();
          }}
        >
          Генерація міст
        </button>
        <h2>Результат</h2>
        <p className="shortest_path">
          Найкоротший шлях: {algorithmResult?.path.join(', ')} ( {algorithmResult?.length} УО )
        </p>
        <p>Час знаходження: {algorithmResult?.time.toString().slice(0, 5)} мс</p>
        <p>Кількість ітерацій: {algorithmResult?.iterations}</p>
        <button
          className="main_button_style"
          type="submit"
          onClick={(e): void => {
            e.preventDefault();
            findPath();
          }}
        >
          Знайти шлях!
        </button>
      </form>
    </div>
  );
}
