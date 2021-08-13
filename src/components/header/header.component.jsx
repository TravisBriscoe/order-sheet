
import React from 'react';
import { Link } from "react-router-dom";

import './header.styles.scss';

const Header = (props, { title = 'Portsmouth Tavern' }) => (
  <div className="header">
    <div className="header-title-user">
      {
        props.userLoggedIn ?
          (<Link to='/manage'>User: {props.userLoggedIn}</Link>)
          : (<Link to='/'>Login</Link>)
      }
    </div>
    <h2 className="header-title-main"><Link to='/'>{title}</Link></h2>
    <div className="header-title-recipes"><Link to='/recipes'>Recipes</Link></div>
    <div className="header-bar-one--labels">
      <label htmlFor="order-where">From:</label>
      <label htmlFor="catagory">Category:</label>
      {/* <label for="sort-order">Sort:</label> */}
    </div>
    <div className="header-bar-one">
      <select name="header-order-where">
        <option value="all" default> -= All =- </option>
        <option value="findlay">Findlay</option>
        <option value="quatrochi">Quatrochi's</option>
        <option value="pigolive">Pig & Olive</option>
        <option value="misc">Misc</option>
      </select>
      <select name="header-order-catagory">
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
      {/* <select name="sort-order">
        <option value="asc" default>Ascending</option>
        <option value="des">Descending</option>
      </select> */}
      <div className="header-bar-two">
        <input type="text"></input>
        <button>Search</button>
      </div>
    </div>
  </div>
);

export default Header;