import React, { useEffect, useState } from 'react';
import './antcolonyoptions.css';
import { useDispatch } from 'react-redux';
import ICoefficients from '../../../../../../common/interfaces/ICoefficients';
import { setCoefficients } from '../../../../../../store/actions';

export default function AntColonyOptions(): React.ReactElement {
  const dispatch = useDispatch();
  const [coefficients, changeCoefficients] = useState<ICoefficients>({
    alpha: 3,
    beta: 7,
    Q: 70,
    evaporation: 0.1,
    antsAmount: 20,
  });
  useEffect(() => {
    setCoefficients(dispatch, coefficients);
  }, [coefficients]);
  return (
    <form className="options_form algorithm_options">
      <div className="option">
        <label>Кількість мурах на кожній точці</label>
        <input
          type="number"
          defaultValue={20}
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
          defaultValue={3}
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
          defaultValue={7}
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
  );
}
