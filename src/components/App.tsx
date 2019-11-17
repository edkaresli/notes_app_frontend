import React from 'react';

import '../components/App.css';

import Nav from '../components/Nav';
import Content from '../components/Content';


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Nav />
      <Content />
    </div>
  );
} 

export default App;
