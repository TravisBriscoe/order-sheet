
import React from 'react';
import { Link } from "react-router-dom";

import './header.styles.scss';

const Header = (props) => {
  const { isUserLoggedIn, userLoggedIn, title = 'Portsmouth Tavern' } = props;
  
  return (
    <div className={`header ${!isUserLoggedIn ? "is-blurred" : ""}`} >
      <div className="header-title-user">
        {
          userLoggedIn ?
            (<Link to='/manage'>User: {userLoggedIn}</Link>)
            : (<Link to='/'>Login</Link>)
        }
      </div>
      <h2 className="header-title-main"><Link to='/'>{title}</Link></h2>
      <div className="header-title-recipes"><Link to='/recipes'>Recipes</Link></div>
      
      <div className='header-title-actions'>
        <label className='header-title-actions-labels-where' htmlFor="order-where">From:</label>
        <select className="header-title-actions--where" name="header-order-where">
          <option value="all" default> -= All =- </option>
          <option value="findlay">Findlay</option>
          <option value="quatrochi">Quatrochi's</option>
          <option value="pigolive">Pig & Olive</option>
          <option value="misc">Misc</option>
        </select>
        <label className='header-title-actions-labels-what' htmlFor="catagory">Category:</label>
        <select className='header-title-actions--what' name="header-order-catagory">
          <option value="all" default> -= ALL =- </option>
          <option value="fridge">Fridge</option>
          <option value="freezer">Freezer</option>
          <option value="pantry">Pantry</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meats</option>
          <option value="produce">Produce</option>
          <option value="sauces">Sauces & Dressings</option>
          <option value="paper">Paper</option>
          <option value="misc">Misc</option>
        </select>
        <input className="header-title-actions--search_input" type="text"></input>
        <button className="header-title-actions--search_button">Search</button>
      </div>
    </div>
  )
};

export default Header;