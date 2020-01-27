import React from 'react';

import './Content.css';

export interface INote {
  note_id: number 
  note_title: string 
  note_body: string 
}

export interface INotes {
  notes: INote[]
}
class Content extends React.Component<INotes, INotes> {
  constructor(props: INotes) {
      super(props);

      this.state = { notes: [] };
  }

  render() { 
    return (
      <div id="maincontent">
        <p>Hi there!</p>
      </div>
    );
  }
}

export default Content;