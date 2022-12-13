import React from 'react';

export default function Path(props: {x1: number, y1: number, x2: number, y2: number}): React.ReactElement {
  const {x1, x2, y1, y2} = props;
  return <div className="Path" />;
}
