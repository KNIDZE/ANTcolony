import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGeneticOptionsDispatch } from '../../../../../../store/actions';
import { IGeneticOptions } from '../../../../../../common/interfaces/IGeneticOptions';

export default function GeneticOptions(): React.ReactElement {
  const dispatch = useDispatch();
  const [geneticOptions, setGeneticOptions] = useState<IGeneticOptions>({
    populationSize: 6,
    generationAmount: 2,
    mutationAmount: 2,
  });
  useEffect(() => {
    setGeneticOptionsDispatch(dispatch, geneticOptions);
  }, [geneticOptions]);
  return (
    <form className="options_form algorithm_options">
      <div className="option">
        <label>Розмір популяції</label>
        <input
          type="number"
          min={1}
          value={geneticOptions.populationSize}
          onChange={(e): void =>
            setGeneticOptions((prevState) => ({
              ...prevState,
              populationSize: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="option">
        <label>Кількість поколінь</label>
        <input
          type="number"
          min={0}
          value={geneticOptions.generationAmount}
          onChange={(e): void =>
            setGeneticOptions((prevState) => ({
              ...prevState,
              generationAmount: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="option">
        <label>Кількість мутацій</label>
        <input
          type="number"
          min={0}
          value={geneticOptions.mutationAmount}
          onChange={(e): void =>
            setGeneticOptions((prevState) => ({
              ...prevState,
              mutationAmount: Number(e.target.value),
            }))
          }
        />
      </div>
    </form>
  );
}
