import React from 'react';
import './city.css';

export default function City(props: { x: number; y: number; id: number }): React.ReactElement {
  const { x, y, id } = props;
  return (
    <span
      className="city"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
      id={`city_${id}`}
    />
  );
}
