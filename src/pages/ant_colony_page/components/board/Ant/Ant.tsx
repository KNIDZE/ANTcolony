import React from 'react';
import './ant.css';
import { useSelector } from 'react-redux';

function mapStateToProps(state: { move: boolean }): boolean {
  return state.move;
}
export default function Ant(props: { x1: number; y1: number; x2: number; y2: number }): React.ReactElement {
  const move = useSelector(mapStateToProps);
  const { x1, y1, x2, y2 } = props;
  const x = move ? x2 : x1;
  const y = move ? y2 : y1;
  return <div className="ant" style={{ left: `${x}px`, top: `${y}px` }} />;
}
