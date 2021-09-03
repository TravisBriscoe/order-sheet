import React from 'react';

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

  onChangeInput(event, where) {
    const { value } = event.target;

    this.state.onMenuSelect(value)

    // this.setState({ [where]: value }, () => {
    //   this.state.onMenuSelect({dist: this.state.distributor, sWhere: this.state.storedWhere, sWhat: this.state.storedWhat})
    // });
  }

  render() {

    console.log(this.props.sortCategory)

    return (
      <div className='product-headers'>
        <div className='product-headers-actions'>
          {/* <select className="product-headers-actions--from" name="header-order-from" value={this.state.distributor} onChange={(event) => this.onChangeInput(event, 'distributor')}>
            <option value="all" default> -= Distributor =- </option>
            <option value="findlays">Findlay</option>
            <option value="quattrocchis">Quattrocchi's</option>
            <option value="pigolive">Pig &amp; Olive</option>
            <option value="misc">Misc</option>
          </select>
          <select className='product-headers-actions--storage' name='header-order-storage' value={this.state.storedWhere} onChange={(event) => this.onChangeInput(event, 'storedWhere')}>
            <option value="all" default> -= Storage =- </option>
            <option value="fridge">Fridge</option>
            <option value="freezer">Freezer</option>
            <option value="pantry">Pantry</option>
          </select>
          <select className='product-headers-actions--category' name="header-order-catagory" value={this.state.storedWhat} onChange={(event) => this.onChangeInput(event, 'storedWhat')}>
            <option value="all" default> -= Category =- </option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meats</option>
            <option value="produce">Produce</option>
            <option value="sauces">Sauces &amp; Dressings</option>
            <option value="spices">Spices</option>
            <option value="oil">Oil &amp; Vinegar</option>
            <option value="paper">Paper/Plastic</option>
            <option value="chemical">Chemicals</option>
            <option value="bar">Bar</option>
            <option value="bread">Bread</option>
            <option value="misc">Misc</option>
          </select> */}
          <select className='product-headers-actions--category' name="header-order-catagory" value={this.props.sortCategory} onChange={(event) => this.onChangeInput(event, 'storedWhat')}>
            <option value="all" default> -= ALL =- </option>
            <option value="findlays">Findlay</option>
            <option value="quattrocchis">Quattrocchi's</option>
            <option value="pigolive">Pig &amp; Olive</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meats</option>
            <option value="produce">Produce</option>
            <option value="sauces">Sauces &amp; Dressings</option>
            <option value="spices">Spices</option>
            <option value="oil">Oil &amp; Vinegar</option>
            <option value="paper">Paper/Plastic</option>
            <option value="chemical">Chemicals</option>
            <option value="bar">Bar</option>
            <option value="bread">Bread</option>
            <option value="misc">Misc</option>
          </select>
          <input className="product-headers-actions--search_input" type="text" placeholder='Search!' onChange={this.state.onHandleSearch}></input>
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
}

export default ProductListMenu;