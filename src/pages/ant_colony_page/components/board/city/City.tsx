import React, { useEffect } from 'react';
import './city.css';

export default function City(props: { x: number; y: number; id: number }): React.ReactElement {
  const { x, y, id } = props;
  useEffect(() => {
    const city = document.getElementById(`city_${id}`);
    if (city != null) {
      city.style.top = `${y}px`;
      city.style.left = `${x}px`;
    }
  });
  return (
    <span className="city" id={`city_${id}`}>
      {id}
    </span>
  );
}
