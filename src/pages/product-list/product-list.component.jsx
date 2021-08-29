import React from 'react';
import ProductListContent from '../../components/product-list-content/product-list-content.component';
import ProductListMenu from '../../components/product-list-menu/product-list-menu.component';

import './product-list.styles.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      products: this.props.products,
      orderProducts: {},
      quantity: 0,
    }
  }

  handleInputChange(event, name) {
    const target = event.target;
    const value = target.value;
    this.setState({ quantity: value })
    this.setState({ orderProducts: {
      [name]: value
    }}, () => console.log(this.state.orderProducts));
  }

  render() {
    return (
      <div className='product'>
        <ProductListMenu />
        <div className='product-items'>
          <ProductListContent products={this.state.products} />
        </div>
      </div>
    )
  }
};

export default ProductList;