import React from 'react';

import './Nav.css';
import { isUserWhitespacable } from '@babel/types';

const Nav: React.FC = (props) => {
  return (
    <ul id="nav_style">
      <li>Add Note</li>
      <li>Language:<input type=""></input></li>
    </ul>
  );
}

export default Nav;