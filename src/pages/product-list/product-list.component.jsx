import React from 'react';

import './product-list.styles.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: this.props.products
    }
  }
  render() {
    const { products } = this.state;
    const { where } = products;
    const { findlays, quattrocchis, pigolive } = where;
    const productsObj = Object.entries(products);

    return (
      // product-id name desc unit split quantity
      <div className='product'>
        <div className='product-headers'>
          <div className='product-headers-actions'>
            <label className='product-headers-actions-labels-from' htmlFor="header-order-from">From:</label>
            <select className="product-headers-actions--from" name="header-order-from">
              <option value="all" default> -= ALL =- </option>
              <option value="findlay">Findlay</option>
              <option value="quattrocchi">Quattrocchi's</option>
              <option value="pigolive">Pig &amp; Olive</option>
              <option value="misc">Misc</option>
            </select>
            <label className='product-headers-actions-labels-storage' htmlFor='header-order-storage'>Storage:</label>
            <select className='product-headers-actions--storage' name='header-order-storage'>
              <option value="all" default> -= ALL =- </option>
              <option value="fridge">Fridge</option>
              <option value="freezer">Freezer</option>
              <option value="pantry">Pantry</option>
            </select>
            <label className='product-headers-actions-labels-category' htmlFor="header-order-catagory">Category:</label>
            <select className='product-headers-actions--category' name="header-order-catagory">
              <option value="all" default> -= ALL =- </option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meats</option>
              <option value="produce">Produce</option>
              <option value="sauces">Sauces &amp; Dressings</option>
              <option value="spices">Spices</option>
              <option value="paper">Paper/Plastic</option>
              <option value="chemicals">Chemicals</option>
              <option value="misc">Misc</option>
            </select>
            <input className="product-headers-actions--search_input" type="text" placeholder='Search!'></input>
            <button className="product-headers-actions--search_btn--clr">Clear</button>
          </div>
          <div className='product-headers-labels'>
            {/* <div className='product-headers-id'>Product Id</div> */}
            <div className='product-headers-labels-name'>Name</div>
            <div className='product-headers-labels-desc'>Description</div>
            <div className='product-headers-labels-unit'>Unit</div>
            <div className='product-headers-labels-split'>Split?</div>
            <div className='product-headers-labels-quantity'>Order Quantity</div>
          </div>
        </div>
        <div>
          <div className='product-items'>
            {
              productsObj.map(el => {
                return (
                  <ul className='product-item' key={el[1]}>
                    {/* <li className='product-item-id'>1</li> */}
                    <li className='product-item-name'>Cheddar</li>
                    <li className='product-item-desc'>Shredded</li>
                    <li className='product-item-unit'>4x5lb/cs</li>
                    <li className='product-item-split'>Y</li>
                    <input type='text' className='product-item-quantity' placeholder='0' />
                  </ul>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
};

export default ProductList;