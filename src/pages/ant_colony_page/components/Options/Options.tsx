import React, { useState } from 'react';
import './options.css';
import { connect, useDispatch } from 'react-redux';
import ACity from '../../../../common/interfaces/ACity';
import useAntColony from "../../../../algorithm's/ant colony/ant_colony";

interface OptionsProps {
  cities: ACity[];
}
function Options(props: OptionsProps): React.ReactElement {
  const { cities } = props;
  const dispatch = useDispatch();
  const [alpha, changeAlpha] = useState(2);
  const [beta, changeBeta] = useState(5);
  const [Q, changeQ] = useState(70);
  const [evaporation, changeEvaporation] = useState(0.1);
  const [antsAmount, changeAntsAmount] = useState(10);
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const best = useAntColony(cities, alpha, beta, Q, evaporation, antsAmount);
    const result = document.getElementById('best_choice');
    // eslint-disable-next-line no-console
    console.log(best);
    if (result !== null) result.innerHTML = `${best}`;
    dispatch({ type: 'SET_BEST_WAY', payload: best });
  };
  return (
    <div className="options">
      <h2>Налаштування</h2>
      <form className="options_form">
        <label>Кількість мурах на кожній точці</label>
        <input
          type="number"
          defaultValue={10}
          min={1}
          onChange={(e): void => changeAntsAmount(+e.currentTarget.value)}
        />
        <label>Коефіцієнт alpha</label>
        <input type="number" defaultValue={2} min={0} onChange={(e): void => changeAlpha(+e.currentTarget.value)} />
        <label>Коефіцієнт beta</label>
        <input type="number" min={0} defaultValue={5} onChange={(e): void => changeQ(+e.currentTarget.value)} />
        <label>Коефіцієнт Q</label>
        <input type="number" min={0} defaultValue={70} onChange={(e): void => changeBeta(+e.currentTarget.value)} />
        <label>Вивітрювання</label>
        <input
          type="number"
          min={0}
          defaultValue={0.1}
          step={0.1}
          max={1}
          onChange={(e): void => changeEvaporation(+e.currentTarget.value)}
        />
      </form>
      <button type="submit" onClick={handleClick}>
        Знайти шлях!
      </button>
      <p id="best_choice" />
    </div>
  );
}
const mapStateToProps = (state: OptionsProps): OptionsProps => ({
  cities: state.cities,
});
export default connect(mapStateToProps)(Options);
