import React from 'react';
import './hint.css';

export default function Hint({ hint, show }: { hint: string; show: boolean }): React.ReactElement {
  const className = show ? 'option_hint' : 'hidden';
  return <p className={className}>{hint}</p>;
}
