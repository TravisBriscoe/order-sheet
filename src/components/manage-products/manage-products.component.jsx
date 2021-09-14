import React from 'react';

import EditProduct from '../edit-product/edit-product.component';

class ManageProducts extends React.Component {
  constructor(props) {
    super(props)

    this.setUseHidden = this.setUseHidden.bind(this);

    this.state = {}
    // eslint-disable-next-line react/no-direct-mutation-state
    this.props.products.forEach(product => this.state[`${product.id}`] = false)
  }

  setUseHidden(product, boo) {
    Object.entries(this.state).forEach(id => {
      if (!id[1]) this.setState({ [product]: boo});
      else {
        const alreadyHidden = id[0];
        this.setState({ [alreadyHidden]: false});
        this.setState({ [product]: boo});
      }
    })
  }

  render() {

    return (
      <div className='manage-products'>
        {
          !this.props.products ?
            (
              <div className='manage-products-btn--new_product'>
                <button>Create New Product</button>
              </div>
            )
          :
          <div className='manage-products-list'>
            {
              this.props.products.map(product => (
                <div className='manage-products-list-product' key={product.id}>
                  <div className='manage-products-list-name'>{product.name}</div>
                  {
                    !this.state[product.id] ? 
                      (<button className='manage-products-list-btn--edit' onClick={() => this.setUseHidden(product.id, true)}>Edit Product</button>)
                    :
                      (<button className='manage-products-list-btn--cancel' onClick={() => this.setUseHidden(product.id, false)}>Cancel</button>)
                  }
                  { this.state[product.id] ? (<EditProduct product={product} setUseHidden={this.setUseHidden} />) : null }
                </div>
              ))
            } 
          </div>
        }
      </div>
    )
  }
}

export default ManageProducts;