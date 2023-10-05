import React, { useEffect, useState } from 'react';
import './workboard.css';
import { useDispatch, useSelector } from 'react-redux';
import City from './city/City';
import ACity from '../../../../common/interfaces/ACity';
import { drawLines, clearReturnContext } from './boardDrawFunctions';
import Ant from './Ant/Ant';

import { addCitiesToStore } from '../../../../store/actions';
import { IBoardProps } from '../../../../common/interfaces/IBoardProps';

const mapStateToProps = (state: { cities: ACity[] }): IBoardProps => ({
  propsCities: state.cities,
});

export default function WorkBoard(): React.ReactElement {
  const { propsCities } = useSelector(mapStateToProps);
  const [dataList, setDataList] = useState<ACity[]>([]);
  const [cityList, changeCities] = useState<JSX.Element[]>([]);
  const [antsList, setAnts] = useState<React.ReactElement[]>([]);
  const dispatch = useDispatch();
  function addGraphic(workList: ACity[]): void {
    const ants: React.ReactElement[] = [];
    let keyCounter = 0;
    workList.forEach((element) => {
      workList.forEach((element2) => {
        if (element !== element2)
          ants.push(
            <Ant key={keyCounter++} x1={element.x + 13} y1={element.y + 30} x2={element2.x + 13} y2={element2.y + 30} />
          );
      });
    });
    setAnts(ants);
    const list = workList.map((el) => <City key={el.id} x={el.x} y={el.y} id={el.id} position={el.position} />);
    changeCities(list);
    if (workList.length > 1) {
      drawLines(workList);
    }
  }
  useEffect(() => {
    setDataList(propsCities);
    addGraphic(propsCities);
  }, [propsCities]);
  const handleBoardClick = (e: React.MouseEvent): void => {
    const cityX = e.pageX - e.currentTarget.getBoundingClientRect().left;
    const cityY = e.pageY - e.currentTarget.getBoundingClientRect().top;
    dataList.push({ x: cityX - 20, y: cityY - 40, id: dataList.length, position: dataList.length + 1 });
    setDataList(dataList);
    addCitiesToStore(dispatch, dataList);
    addGraphic(dataList);
  };
  const handleClearClick = (): void => {
    clearReturnContext();
    dataList.slice(0, dataList.length);
    setDataList([]);
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
      <p className="hint">Натисніть по карті, щоб обрати точку для нового міста</p>
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
