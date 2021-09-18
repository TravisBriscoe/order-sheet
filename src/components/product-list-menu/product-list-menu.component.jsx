import React from 'react';

import './product-list-menu.styles.scss';

class ProductListMenu extends React.Component {
  constructor(props) {
    super(props)

    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = {
      distributor: 'all',
      storedWhere: 'all',
      storedWhat: 'all',
      onMenuSelect: this.props.onMenuSelect,
      onHandleSearch: this.props.onHandleSearch,
    }
  }

  onChangeInput(event) {
    const { value } = event.target;

    this.state.onMenuSelect(value)
  }

  render() {

    return (
      <div className='product-list-header'>
        <div className='product-list-header-actions'>
          <select className='product-list-header-actions--category' name="header-order-catagory" value={this.props.sortCategory} onChange={(event) => this.onChangeInput(event, 'storedWhat')}>
            <option value="all"> -= ALL =- </option>
            <option value="">Distributor:</option>
            <option value="findlays">&nbsp;&nbsp;Findlay</option>
            <option value="quattrocchis">&nbsp;&nbsp;Quattrocchi's</option>
            <option value="pigolive">&nbsp;&nbsp;Pig &amp; Olive</option>
            <option value="">Category:</option>
            <option value="dairy">&nbsp;&nbsp;Dairy</option>
            <option value="meat">&nbsp;&nbsp;Meats</option>
            <option value="produce">&nbsp;&nbsp;Produce</option>
            <option value="sauces">&nbsp;&nbsp;Sauces &amp; Dressings</option>
            <option value="spices">&nbsp;&nbsp;Spices</option>
            <option value="oil">&nbsp;&nbsp;Oil &amp; Vinegar</option>
            <option value="paper">&nbsp;&nbsp;Paper/Plastic</option>
            <option value="chemical">&nbsp;&nbsp;Chemicals</option>
            <option value="bar">&nbsp;&nbsp;Bar</option>
            <option value="bread">&nbsp;&nbsp;Bread</option>
            <option value="misc">&nbsp;&nbsp;Misc</option>
          </select>
          <input className="product-list-header-actions--search" type="text" placeholder='Search by Name or Description' onChange={this.state.onHandleSearch}></input>
        </div>
        <div className='product-list-header-labels'>
          <div className='product-list-header-labels-name'>Name</div>
          <div className='product-list-header-labels-desc'>Description</div>
          <div className='product-list-header-labels-unit'>Unit</div>
          <div className='product-list-header-labels-split'>Split?</div>
          <div className='product-list-header-labels-quantity'>Order Quantity</div>
        </div>
      </div>
    )
  }
}

export default ProductListMenu;