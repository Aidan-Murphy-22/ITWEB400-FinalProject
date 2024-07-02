import React from 'react';

function Header({ setActiveComponent }) {
  return (
    <header>
      <h1>Iron Forge Fitness</h1>
      <nav className="headerNav">
        <ul>
          <li className="pageLinks">
            <a href="#" onClick={() => setActiveComponent('nutrition')}>
              Nutrition
            </a>
          </li>
          <li className="pageLinks">
            <a href="#" onClick={() => setActiveComponent('weeklyView')}>
              Daily View
            </a>
          </li>
          <li className="pageLinks">
            <a href="#" onClick={() => setActiveComponent('exercise')}>
              Exercise
            </a>
          </li>
          
        </ul>
      </nav>
      <hr />
    </header>
  );
}

export default Header;