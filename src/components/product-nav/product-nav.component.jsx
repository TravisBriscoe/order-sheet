import React from 'react';

import { NavLink, useRouteMatch } from 'react-router-dom';

import './product-nav.styles.scss';

const ProductNav = ({ products }) => {
  const { path } = useRouteMatch();
  // console.log(products)

  return (
    <nav className='manage-products-list-nav'>
      {
        Object.entries(products).map(key => {
          const { id, name } = key[1]
          return (<NavLink key={id} activeStyle={{backgroundColor: "blue", color: "white"}} to={`${path}/${id.toLowerCase()}`}>{name}</NavLink>)
        })
      }
    </nav>

  )
}

export default ProductNav;