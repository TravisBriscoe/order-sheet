import React from 'react';

import './product-list-content.styles.scss';

class ProductListContent extends React.Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      quantity: {},
      orderProducts: {},
      setOnOrder: this.props.setOnOrder,
    }
  }

  handleInputChange(event, orderedProducts) {
    const { name, id } = orderedProducts;
    const { value } = event.target;

    for (let i in this.state.quantity) {
      if (i === id) {
        delete this.state.quantity[i];
      }
    }

    this.setState({ quantity: {
      [id]: {
        name,
        value,
      },
      ...this.state.quantity
    }})

    for (let i in this.state.orderProducts) {
      if (i === id) {
        delete this.state.orderProducts[i];
      }
    }

    this.setState((prevState) => ({
      orderProducts: {
        ...prevState.orderProducts,
        [id]: {
          name,
          value,
        }
      }
    }), () => this.state.setOnOrder({id,
      data: {
        name,
        value,
        id
      }}));

  }


  render() {
    
    const { sortedProds, onOrder } = this.props;

    console.log(onOrder)
    
    return (
      <div className='product-list-items'>
        {
          Object.entries(sortedProds).map(el => {
            const prod = el[1];
            return (
              <ul className='product-list-items-item' key={prod.id}>
                <li className='product-list-items-item-name'>{prod.name}</li>
                <li className='product-list-items-item-desc'>{prod.desc}</li>
                <li className='product-list-items-item-unit'>{prod.unit}</li>
                <input type='checkbox' checked={prod.split ? 'checked' : ''} readOnly className='product-list-items-item-split' />
                <input type='text' className='product-list-items-item-quantity' placeholder={!onOrder[prod.id] ? '0' : onOrder[prod.id].data.value} defaultValue={!onOrder[prod.id] ? '' : onOrder[prod.id].value} onChange={(event) => this.handleInputChange(event, { name: prod.name, id: prod.id })} />
              </ul>
            )
          })
        } 
      </div>
    );
  }
}

export default ProductListContent;