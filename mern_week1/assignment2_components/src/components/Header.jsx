import React from 'react';
import './styles.css';

const Header = ({ title, navItems }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">{title}</h1>
        <nav>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index}><a href={`#${item.toLowerCase()}`}>{item}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
