import React from 'react';

const ProductListMenu = () => {

  return (
    <div className='product-headers'>
      <div className='product-headers-actions'>
        <select className="product-headers-actions--from" name="header-order-from">
          <option value="all" default> -= Distributor =- </option>
          <option value="findlay">Findlay</option>
          <option value="quattrocchi">Quattrocchi's</option>
          <option value="pigolive">Pig &amp; Olive</option>
          <option value="misc">Misc</option>
        </select>
        <select className='product-headers-actions--storage' name='header-order-storage'>
          <option value="all" default> -= Storage =- </option>
          <option value="fridge">Fridge</option>
          <option value="freezer">Freezer</option>
          <option value="pantry">Pantry</option>
        </select>
        <select className='product-headers-actions--category' name="header-order-catagory">
          <option value="all" default> -= Category =- </option>
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
        {/* <button className="product-headers-actions--search_btn--clr">Clear</button> */}
      </div>
      <div className='product-headers-labels'>
        <div className='product-headers-labels-name'>Name</div>
        <div className='product-headers-labels-desc'>Description</div>
        <div className='product-headers-labels-unit'>Unit</div>
        <div className='product-headers-labels-split'>Split?</div>
        <div className='product-headers-labels-quantity'>Order Quantity</div>
      </div>
    </div>
  )
}

export default ProductListMenu;