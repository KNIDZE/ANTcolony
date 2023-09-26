import React from 'react';

export default function GeneticOptions(): React.ReactElement {
  return (
    <form className="options_form algorithm_options">
      <div className="option">
        <label>Розмір популяції</label>
        <input type="number" defaultValue={20} min={1} />
      </div>
      <div className="option">
        <label>Кількість поколінь</label>
        <input type="number" defaultValue={3} min={0} />
      </div>
    </form>
  );
}
