import React, { useState } from 'react';
import './workboard.css';
import { connect, useDispatch } from 'react-redux';
import City from './city/City';
import ACity from '../../../../common/interfaces/ACity';
import addCitiesToStore from '../../../../store/actions';

interface BoardProps {
  bestPath: number[];
}
function WorkBoard(props: BoardProps): React.ReactElement {
  const { bestPath } = props;
  const [dataList, changeData] = useState<ACity[]>([]);
  const [cityList, changeCities] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch();

  function clearReturnContext(): CanvasRenderingContext2D | null {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        return context;
      }
    }
    return null;
  }

  function drawLine(x1: number, y1: number, x2: number, y2: number, context: CanvasRenderingContext2D): void {
    // eslint-disable-next-line no-console
    console.log(context.canvas.width);
    context.beginPath();
    context.moveTo(x1 + 10, y1 + 10);
    context.lineTo(x2 + 10, y2 + 10);
    context.stroke();
  }

  const handleBoardClick = (e: React.MouseEvent): void => {
    const cityX = e.pageX - e.currentTarget.getBoundingClientRect().left;
    const cityY = e.pageY - e.currentTarget.getBoundingClientRect().top;
    dataList.push({ x: cityX, y: cityY, id: dataList.length });
    addCitiesToStore(dispatch, dataList);
    changeData(dataList);
    const list = dataList.map((el) => <City key={el.id} x={el.x} y={el.y} id={el.id} />);
    changeCities(list);
    if (dataList.length > 1) {
      const context = clearReturnContext();
      if (context) {
        context.strokeStyle = 'red';
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.setLineDash([30, 30]);
        dataList.forEach((e1) => {
          dataList.forEach((e2) => {
            if (e1 !== e2) drawLine(e1.x, e1.y, e2.x, e2.y, context);
          });
        });
      }
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
  };
  // show best way
  if (bestPath.length > 1) {
    const context = clearReturnContext();
    if (context) {
      context.strokeStyle = 'blue';
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(dataList[bestPath[0]].x, dataList[bestPath[0]].y);
      for (let i = 0; i < bestPath.length - 1; i++) {
        drawLine(
          dataList[bestPath[i]].x,
          dataList[bestPath[i]].y,
          dataList[bestPath[i + 1]].x,
          dataList[bestPath[i + 1]].y,
          context
        );
      }
    }
  }
  return (
    <div className="board_button relative">
      <div onClick={handleBoardClick} className="work_board">
        {cityList}
        <canvas height="540px" width="960px" id="canvas" />
      </div>
      <button className="clear_button" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
}
const mapStateToProps = (state: BoardProps): BoardProps => ({
  bestPath: state.bestPath,
});
export default connect(mapStateToProps)(WorkBoard);
