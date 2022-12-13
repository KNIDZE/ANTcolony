import React from 'react';
import WorkBoard from './components/board/WorkBoard';
import './acp.css';
import Options from './components/Options/Options';

export function ACP(): React.ReactElement {
  return (
    <section className="acp_section flex_row">
      <div className="flex_row fit_content">
        <WorkBoard />
        <Options />
      </div>
    </section>
  );
}
