import logo from '../images/logo.svg'
import React from 'react';

function Header() {
  return (
       <header className="header">
        <img className="header__logo" src={logo} alt="Лого Сайта" />
      </header>

  );
}

export default Header;
