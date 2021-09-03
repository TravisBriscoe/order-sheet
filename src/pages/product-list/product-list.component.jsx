import React from 'react';
import ProductListContent from '../../components/product-list-content/product-list-content.component';
import ProductListMenu from '../../components/product-list-menu/product-list-menu.component';

import './product-list.styles.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      setOnOrder: this.props.setOnOrder,
      onMenuSelect: this.props.onMenuSelect,
      onHandleSearch: this.props.onHandleSearch,
    }
  }

  render() {
    const { setOnOrder, onMenuSelect, onHandleSearch } = this.state;
    const { sortedProds } = this.props
    
    return (
      <div className='product'>
        <ProductListMenu onMenuSelect={onMenuSelect} onHandleSearch={onHandleSearch} sortCategory={this.props.sortCategory} />
        <div className='product-items-container'>
          <div className='product-items'>
            <ProductListContent sortedProds={sortedProds} setOnOrder={setOnOrder} />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductList;