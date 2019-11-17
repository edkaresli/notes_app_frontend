import React from 'react';

import Nav from '../components/Nav';

import '../components/Header.css';

const Header: React.FC = (props) => {
    return (
        <div id="header">
            <Nav />
        </div>
    );
}

export default Header;

