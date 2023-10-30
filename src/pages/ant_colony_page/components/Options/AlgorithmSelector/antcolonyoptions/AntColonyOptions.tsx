import React, { useEffect, useState } from 'react';
import './antcolonyoptions.css';
import { useDispatch } from 'react-redux';
import ICoefficients from '../../../../../../common/interfaces/ICoefficients';
import { setCoefficients } from '../../../../../../store/actions';
import Hint from '../hint/Hint';

export default function AntColonyOptions(): React.ReactElement {
  const dispatch = useDispatch();
  const [coefficients, changeCoefficients] = useState<ICoefficients>({
    alpha: 3,
    beta: 7,
    Q: 70,
    evaporation: 0.1,
    antsAmount: 20,
  });
  const [hintsVisibility, setHintsVisibility] = useState({
    antsAmount: false,
    alpha: false,
    beta: false,
    Q: false,
    evaporation: false,
  });
  useEffect(() => {
    setCoefficients(dispatch, coefficients);
  }, [coefficients]);
  return (
    <form className="options_form algorithm_options">
      <div className="option">
        <label
          onMouseEnter={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              antsAmount: true,
            }));
          }}
          onMouseLeave={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              antsAmount: false,
            }));
          }}
        >
          Кількість мурах на кожній точці
          <Hint
            hint="Кількість мурах, які будуть залишати слід на шляхах за одну ітерацію"
            show={hintsVisibility.antsAmount}
          />
        </label>
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
        <label
          onMouseEnter={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              alpha: true,
            }));
          }}
          onMouseLeave={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              alpha: false,
            }));
          }}
        >
          Коефіцієнт alpha
          <Hint hint="Параметр, що впливає на значущість феромону в алгоритмі" show={hintsVisibility.alpha} />
        </label>
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
        <label
          onMouseEnter={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              beta: true,
            }));
          }}
          onMouseLeave={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              beta: false,
            }));
          }}
        >
          Коефіцієнт beta
          <Hint
            hint="Параметр, що впливає на значущість відстані між містами в алгоритмі"
            show={hintsVisibility.beta}
          />
        </label>
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
        <label
          onMouseEnter={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              Q: true,
            }));
          }}
          onMouseLeave={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              Q: false,
            }));
          }}
        >
          Коефіцієнт Q
          <Hint hint="Кількість феромону, що залишає мураха" show={hintsVisibility.Q} />
        </label>
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
        <label
          onMouseEnter={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              evaporation: true,
            }));
          }}
          onMouseLeave={(): void => {
            setHintsVisibility((prevState) => ({
              ...prevState,
              evaporation: false,
            }));
          }}
        >
          Вивітрювання
          <Hint hint="Кількість феромону, що вивітрюється" show={hintsVisibility.evaporation} />
        </label>
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
