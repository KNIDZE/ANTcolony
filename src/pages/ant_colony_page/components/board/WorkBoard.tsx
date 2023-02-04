import React, { useState } from 'react';
import './workboard.css';
import { useDispatch } from 'react-redux';
import City from './city/City';
import ACity from '../../../../common/interfaces/ACity';
import addCitiesToStore from '../../../../store/actions';
import { drawLines, clearReturnContext } from './boardDrawFunctions';
import Ant from './Ant/Ant';

export default function WorkBoard(): React.ReactElement {
  const [dataList, changeData] = useState<ACity[]>([]);
  const [cityList, changeCities] = useState<JSX.Element[]>([]);
  const [antsList, setAnts] = useState<React.ReactElement[]>([]);
  const dispatch = useDispatch();

  const handleBoardClick = (e: React.MouseEvent): void => {
    const cityX = e.pageX - e.currentTarget.getBoundingClientRect().left;
    const cityY = e.pageY - e.currentTarget.getBoundingClientRect().top;
    dataList.push({ x: cityX - 20, y: cityY - 40, id: dataList.length, position: dataList.length + 1 });
    addCitiesToStore(dispatch, dataList);
    changeData(dataList);
    const ants: React.ReactElement[] = [];
    let keyCounter = 0;
    dataList.forEach((element) => {
      dataList.forEach((element2) => {
        if (element !== element2)
          ants.push(
            <Ant key={keyCounter++} x1={element.x + 13} y1={element.y + 30} x2={element2.x + 13} y2={element2.y + 30} />
          );
      });
    });
    setAnts(ants);
    const list = dataList.map((el) => <City key={el.id} x={el.x} y={el.y} id={el.id} position={el.position} />);
    changeCities(list);
    if (dataList.length > 1) {
      drawLines(dataList);
    }
  };
  const handleClearClick = (): void => {
    clearReturnContext();
    dataList.slice(0, dataList.length);
    changeData([]);
    changeCities([]);
    addCitiesToStore(dispatch, []);
    const result = document.getElementById('best_choice');
    if (result !== null) result.innerHTML = '';
    dispatch({ type: 'SET_BEST_WAY', payload: [] });
    setAnts([]);
  };
  // show best way
  return (
    <div className="board_button relative">
      <p className="hint">Клікніть по карті, щоб обрати точку для нового міста</p>
      <div onClick={handleBoardClick} className="work_board">
        {cityList}
        {antsList}
        <canvas height="540px" width="960px" id="canvas" />
      </div>
      <button className="clear_button" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
}
