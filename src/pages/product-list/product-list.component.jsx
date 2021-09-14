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

  // Menu
  onChangeInput(event) {
    const { value } = event.target;

    this.state.onMenuSelect(value)
  }

  render() {
    const { setOnOrder, onMenuSelect, onHandleSearch } = this.state;
    const { sortedProds } = this.props
    
    return (
      <div className='product-list'>
        {
          sortedProds ?
            <div className='product-list-content'>
              <ProductListMenu onMenuSelect={onMenuSelect} onHandleSearch={onHandleSearch} sortCategory={this.props.sortCategory} />      
              <ProductListContent sortedProds={sortedProds} setOnOrder={setOnOrder} onOrder={this.props.onOrder} />
            </div>
          : (<button className='product-list-btn--create_new'>Create New Product</button>)
        }
      </div>
    );
  }
};

export default ProductList;