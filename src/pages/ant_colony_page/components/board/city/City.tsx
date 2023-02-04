import React from 'react';
import './city.css';

export default function City(props: { x: number; y: number; id: number; position: number }): React.ReactElement {
  const { x, y, id, position } = props;
  return (
    <span
      className="city"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
      id={`city_${id}`}
    >
      <p>{position}</p>
    </span>
  );
}
