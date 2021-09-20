import React from 'react';

import { withRouter } from 'react-router-dom';
// import './add-product.styles.scss';

class AddProduct extends React.Component {
  constructor(props) {
    super(props)

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onHandleCheckbox = this.onHandleCheckbox.bind(this);

    this.prodForm = React.createRef();

    this.state = {
      newProduct: {
        name: '',
        desc: '',
        unit: '',
        id: '',
        dist: '',
        stored: '',
        category: '',
        split: false,
      }
    }
  }

  onHandleInput(event) {
    event.preventDefault();

    const { name } = event.target;
    let { value } = event.target;
 
    // Removes capital letters on all fields except Desc and Name fields
    if (name !== 'name' && name !== 'desc') {
      value = value.toLowerCase();
    }
    // Removes the apostrophes from distributors input
    if (name === 'dist' && value.includes('\'')) {
      let chars = value.split('\'');
      value = chars[0] + chars[1];
    }
    
    this.setState((prevState) => { 
      return ({ newProduct: { ...prevState.newProduct, [name]: value }})
    },  () => {
      if (name === 'id') {
        let newId = this.state.newProduct.id
        if (newId && newId.charAt(0) !== 'u') {
          newId = 'U' + newId;
          this.setState((prevState) => ({ newProduct: {...prevState.newProduct, id: newId.toUpperCase() }}))
        } else {
          let newId = this.state.newProduct.id.toUpperCase()
  
          this.setState((prevState) => ({ newProduct: {...prevState.newProduct, id: newId.toUpperCase() }}))
        }
      } else return;
    })
  }

  onHandleCheckbox(event) {
    // Function for handling the checkbox (wouldn't work with onHandleInput)
    const { name, checked } = event.target;

    this.setState((prevState) => ({
      newProduct: {
        ...prevState.newProduct,
        [name]: checked
      }
    }))
  }

  
  render() {

    return (
      <div className='add-product'>
        <h3>Add A New Product!</h3>
        <form 
          className='add-product-form'
          ref={this.prodForm}
          onSubmit={(event) => {
            event.preventDefault();

            this.props.onSaveProduct(this.state.newProduct);
            this.setState({ newProduct: {
              id: '',
              name: '',
              unit: '',
              desc: '',
              dist: '',
              category: '',
              stored: '',
              split: false,
            }}, () => {
              this.prodForm.current.reset();
            });
          }}
          onReset={(event) => {
            event.preventDefault();

            this.setState({ newProduct: {
              name: '',
              desc: '',
              unit: '',
              id: '',
              dist: '',
              stored: '',
              category: '',
              split: false,
            }})
          }}
        >
          <input className='add-product-form-id' name='id'  placeholder={`ID:`} value={this.state.newProduct.id} onChange={this.onHandleInput} required />
          <input className='add-product-form-name' name='name' placeholder={`Name:`} value={this.state.newProduct.name} onChange={this.onHandleInput} required />
          <input className='add-product-form-unit' name='unit' placeholder={`Unit:`} value={this.state.newProduct.unit} onChange={this.onHandleInput} required />
          <input className='add-product-form-desc' name='desc' placeholder={`Description:`} value={this.state.newProduct.desc} onChange={this.onHandleInput} />
          <input className='add-product-form-dist' name='dist' placeholder={`Distributor:`} value={this.state.newProduct.dist} onChange={this.onHandleInput} required />
          <input className='add-product-form-cat' name='category' placeholder={`Category:`} value={this.state.newProduct.category} onChange={this.onHandleInput} />
          <input className='add-product-form-stored' name='stored' placeholder={`Storage:`} value={this.state.newProduct.stored} onChange={this.onHandleInput} required />
          <div className='add-product-form-split'>
            Split? &nbsp; <input type='checkbox' name='split' value={this.state.newProduct.split} onClick={this.onHandleCheckbox} />
          </div>
            {
               this.props.location.pathname === '/'
                ? <div className='add-product-form-btns'>
                    <input type='submit' className='add-product-form-btns--save' value='Save' />
                  </div>
                : <div className='add-product-form-btns'>
                    <input type='submit' className='add-product-form-btns--save' value='Save' />
                    <button className='add-product-form--btns--cancel' onClick={(event) => {
                      event.preventDefault();

                      this.setState({ newProduct: {
                        name: '',
                        desc: '',
                        unit: '',
                        id: '',
                        dist: '',
                        stored: '',
                        category: '',
                        split: false,
                      }},() => this.props.onAddNewProduct());
                    }}>Cancel</button>
                    <input type='reset' className='add-product-form-btns--reset' value='Clear' />
                  </div>
            }
        </form>
      </div>
    )
  }
}

export default withRouter(AddProduct);