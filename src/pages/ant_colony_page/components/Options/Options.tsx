import React, { useEffect, useState } from 'react';
import './options.css';
import { useDispatch, useSelector } from 'react-redux';
import ACity from '../../../../common/interfaces/ACity';
import { OptionsProps } from '../../../../common/interfaces/IOptions';
import { AlgorithmSelection } from './AlgorithmSelector/AlgorithmSelection';
import bruteForce from '../../../../algorithms/bruteforce/bruteForce';
import useAntColony from '../../../../algorithms/ant colony/ant_colony';
import { IAlgorithmResult } from '../../../../common/interfaces/IAlgorithmResult';
import { drawShortestPath } from '../board/boardDrawFunctions';

interface GeneratorOptions {
  amount: number;
  maxLength: number;
}
const mapStateToProps = (state: OptionsProps): OptionsProps => ({
  propsCities: state.cities,
  algorithm: state.algorithm,
  cities: state.cities,
  alpha: state.alpha,
  beta: state.beta,
  Q: state.Q,
  evaporation: state.evaporation,
  antsAmount: state.antsAmount,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateRandomCities(options: GeneratorOptions): ACity[] {
  const result: ACity[] = [];
  let x = Math.floor(Math.random() * 900);
  let y = Math.floor(Math.random() * 500);
  result.push({
    x,
    y,
    id: 0,
    position: 0,
  });
  for (let i = 1; i < options.amount - 1; i++) {
    x = Math.floor(Math.random() * 900);
    y = Math.floor(Math.random() * 500);
    result.push({ x, y, position: result.length, id: result.length });
  }
  return result;
}
export default function Options(): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const { propsCities, algorithm, beta, alpha, Q, evaporation, antsAmount } = useSelector(mapStateToProps);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cities, setCities] = useState(propsCities);
  const [algrorithmResult, setAlgorithmResult] = useState<IAlgorithmResult>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cityGeneration, generateCities] = useState(false);
  const [generationOptions, setGenerationOptions] = useState({ amount: 20, maxLength: 1000 });

  useEffect(() => setCities(propsCities), [propsCities]);
  function findPath(): void {
    let result: IAlgorithmResult = {
      path: [],
      iterations: 0,
      length: 0,
      time: 0,
    };
    if (algorithm === 'Brute') {
      result = bruteForce(cities);
    }
    if (algorithm === 'ACO') {
      result = useAntColony(cities, alpha, beta, Q, evaporation, antsAmount);
    }
    setAlgorithmResult(result);
    dispatch({ type: 'SET_ANT_MOVE', payload: true });
    drawShortestPath(cities, result.path);
    setTimeout((): void => {
      dispatch({ type: 'SET_ANT_MOVE', payload: false });
    }, 1500);
  }
  return (
    <div className="options">
      <h2>Налаштування</h2>
      <AlgorithmSelection />
      <div className="flex_row">
        <h2>Генерація міст</h2>
        <input
          type="checkbox"
          className="city_generation"
          name="checkbox"
          value="off"
          onChange={(e): void => generateCities(e.currentTarget.checked)}
        />
      </div>
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

        <h2>Результат</h2>
        <p>
          Найкоротший шлях: {algrorithmResult?.path} ( {algrorithmResult?.length} УО )
        </p>
        <p>Час знаходження: {algrorithmResult?.time.toString().slice(0, 5)} мс</p>
        <p>Кількість ітерацій: {algrorithmResult?.iterations}</p>
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
