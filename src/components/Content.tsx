import React from 'react';

import './Content.css';

class Content extends React.Component {
  constructor(props: any) {
      super(props);

      this.state = {};
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