import React from 'react';

import './order-list.styles.scss';

const OrderListPage = (props) => {
  const { onOrder, deleteAllData } = props;
  let onOrderObj;
  onOrderObj = onOrder ? onOrderObj = Object.entries(onOrder) : null;
  
  return (
    <div className='order-sheet'>
      <h2 className='order-sheet-title'>Order Sheet</h2>
      <div className='order-sheet-list'>
      {
        onOrderObj === null || onOrderObj.length <= 0  ?
          (<div className='order-sheet-list--noprods'><h3>Order Sheet Empty!</h3><h3>Please go to the product list and add products for the next order.</h3></div>)
        :
          onOrderObj.splice(0).map((el) => {
            return (
                <ul key={el[1].data.id}>
                  <li className='order-sheet-list-item'>
                    <div className='order-sheet-list-item--name'>{el[1].data.name}:</div><input className='order-sheet-list-item--quant' type='text' placeholder={el[1].data.value} />
                    
                    <button className='order-sheet-list-item--remove_btn' onClick={(event) => {
                      event.preventDefault();
                      
                      props.onDeleteEntry('orderlist', { id: el[1].data.id, name: el[1].data.name })
                    }}>Remove</button>
                  </li>
                </ul>
            )
          })
      }
      </div>
      <div className='order-sheet--clear_btn'>
        <button onClick={() => deleteAllData('orderlist', 'onOrder')}>Clear!</button>
      </div>
    </div>
  );
}


export default OrderListPage;