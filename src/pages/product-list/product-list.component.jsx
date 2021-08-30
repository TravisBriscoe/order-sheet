import React from 'react';
import ProductListContent from '../../components/product-list-content/product-list-content.component';
import ProductListMenu from '../../components/product-list-menu/product-list-menu.component';

import './product-list.styles.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: this.props.products,
      setOnOrder: this.props.setOnOrder,
    }
  }

  render() {
    const { products, setOnOrder } = this.state;

    return (
      <div className='product'>
        <ProductListMenu />
        <div className='product-items-container'>
          <div className='product-items'>
            <ProductListContent products={products} setOnOrder={setOnOrder} />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductList;