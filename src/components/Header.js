import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
let fullDate = mm + '/' + dd + '/' + yyyy

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>LIVE COVID-19 TRACKER</p>
        <p>Current date: {fullDate}</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
