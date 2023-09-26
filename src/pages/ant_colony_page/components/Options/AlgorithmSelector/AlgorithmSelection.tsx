import React, { useEffect, useState } from 'react';
import './algorithmSelector.css';
import { useDispatch } from 'react-redux';
import AntColonyOptions from './antcolonyoptions/AntColonyOptions';
import GeneticOptions from './geneticoptions/GeneticOptions';
import { setAlgorithm } from '../../../../../store/actions';

export function AlgorithmSelection(): React.ReactElement {
  const dispatch = useDispatch();
  const algorithm = ['Brute', 'ACO', 'Genetic'];
  const [selectedItem, setSelectedItem] = useState(algorithm[0]);
  const handleSelect = (value: string): void => {
    setSelectedItem(value);
    dispatch({ type: 'SET_ALGORITHM', payload: value });
  };
  useEffect(() => {
    setAlgorithm(dispatch, selectedItem);
  }, [selectedItem]);
  const algorithms = algorithm.map((alg) => (
    <span
      className={selectedItem === alg ? 'selector_item selected' : 'selector_item'}
      key={alg}
      onClick={(): void => handleSelect(alg)}
    >
      {alg}
    </span>
  ));
  return (
    <div className="algorithm_selector">
      <div className="selector">{algorithms}</div>
      {selectedItem === 'ACO' && <AntColonyOptions />}
      {selectedItem === 'Brute' && <div className="algorithm_options">Додаткових налаштувань немає</div>}
      {selectedItem === 'Genetic' && <GeneticOptions />}
    </div>
  );
}
