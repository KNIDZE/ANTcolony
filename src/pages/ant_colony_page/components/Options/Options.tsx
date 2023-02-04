import React, { useState } from 'react';
import './options.css';
import { connect, useDispatch } from 'react-redux';
import ACity from '../../../../common/interfaces/ACity';
import useAntColony from "../../../../algorithm's/ant colony/ant_colony";
import { drawLines, drawShortestPath } from '../board/boardDrawFunctions';

interface OptionsProps {
  cities: ACity[];
}
interface GeneratorOptions {
  amount: number;
  maxLength: number;
}
interface ICoefficient {
  alpha: number;
  beta: number;
  Q: number;
  evaporation: number;
  antsAmount: number;
}
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
function Options(props: OptionsProps): React.ReactElement {
  let { cities } = props;
  const dispatch = useDispatch();
  const [coefficients, changeCoefficients] = useState<ICoefficient>({
    alpha: 2,
    beta: 5,
    Q: 70,
    evaporation: 0.1,
    antsAmount: 10,
  });
  const [bestWay, setBestWay] = useState('');
  const [time, setTime] = useState<string>();
  const [length, setLength] = useState<number>();
  const [cityGeneration, generateCities] = useState(false);
  const [generationOptions, setGenerationOptions] = useState({ amount: 20, maxLength: 1000 });
  const handleClick = (e: React.MouseEvent): void => {
    if (cityGeneration && generationOptions.amount > 1) {
      cities = generateRandomCities(generationOptions);
      drawLines(cities);
    }
    if (cities.length > 1) {
      e.preventDefault();
      const best = useAntColony(
        cities,
        coefficients.alpha,
        coefficients.beta,
        coefficients.Q,
        coefficients.evaporation,
        coefficients.antsAmount
      );
      dispatch({ type: 'SET_ANT_MOVE', payload: true });
      let result = '';
      best.cities
        .map((el) => el + 1)
        .forEach((el) => {
          result += ` ${el.toString()},`;
        });
      result = result.slice(0, result.length - 1);
      setTimeout(() => {
        dispatch({ type: 'SET_ANT_MOVE', payload: false });
        setBestWay(result);
        setLength(best.length);
        setTime(best.time);
      }, 1500);
      drawShortestPath(cities, best.cities);
    }
  };
  return (
    <div className="options">
      <h2>Налаштування</h2>
      <form className="options_form">
        <div className="option">
          <label>Кількість мурах на кожній точці</label>
          <input
            type="number"
            defaultValue={10}
            min={1}
            onChange={(e): void => {
              coefficients.antsAmount = +e.currentTarget.value;
              changeCoefficients(coefficients);
            }}
          />
        </div>
        <div className="option">
          <label>Коефіцієнт alpha</label>
          <input
            type="number"
            defaultValue={2}
            min={0}
            onChange={(e): void => {
              coefficients.alpha = +e.currentTarget.value;
              changeCoefficients(coefficients);
            }}
          />
        </div>
        <div className="option">
          <label>Коефіцієнт beta</label>
          <input
            type="number"
            min={0}
            defaultValue={5}
            onChange={(e): void => {
              coefficients.beta = +e.currentTarget.value;
              changeCoefficients(coefficients);
            }}
          />
        </div>
        <div className="option">
          <label>Коефіцієнт Q</label>
          <input
            type="number"
            min={0}
            defaultValue={70}
            onChange={(e): void => {
              coefficients.antsAmount = +e.currentTarget.value;
              changeCoefficients(coefficients);
            }}
          />
        </div>
        <div className="option">
          <label>Вивітрювання</label>
          <input
            type="number"
            min={0}
            defaultValue={0.1}
            step={0.1}
            max={1}
            onChange={(e): void => {
              coefficients.evaporation = +e.currentTarget.value;
              changeCoefficients(coefficients);
            }}
          />
        </div>
      </form>
      <div className="flex_row">
        <h2>Генерація міст</h2>
        <input
          type="checkbox"
          className="city_generation"
          name="checkbox"
          value="off"
          /* eslint-disable-next-line no-console */
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
      </form>
      <h2>Результат</h2>
      <p>
        Найкоротший шлях: {bestWay} ( {length} УО )
      </p>
      <p>Час знаходження: {time?.slice(0, 5)} мс</p>
      <button className="main_button_style" type="submit" onClick={handleClick}>
        Знайти шлях!
      </button>
    </div>
  );
}
const mapStateToProps = (state: OptionsProps): OptionsProps => ({
  cities: state.cities,
});
export default connect(mapStateToProps)(Options);
