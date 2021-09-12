import React from 'react';

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
      }}));

  }


  render() {
    
    const { sortedProds, onOrder } = this.props;
    
    return (
      <div className="product-items">
        {
          Object.entries(sortedProds).map(el => {
            const prod = el[1];
            return (
              <ul className='product-items-item' key={prod.id}>
                <li className='product-items-item-name'>{prod.name}</li>
                <li className='product-items-item-desc'>{prod.desc}</li>
                <li className='product-items-item-unit'>{prod.unit}</li>
                <input type='checkbox' checked={prod.split ? 'checked' : ''} readOnly className='product-items-item-split' />
                <input type='text' className='product-items-item-quantity' placeholder='0' defaultValue={onOrder[prod.id] ? onOrder[prod.id].value : ''} onChange={(event) => this.handleInputChange(event, { name: prod.name, id: prod.id })} />
              </ul>
            )
          })
        } 
      </div>
    );
  }
}

export default ProductListContent;