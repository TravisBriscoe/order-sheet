import React from 'react';

// import './order-list.component.scss';

const OrderListPage = ({ noteMsg, notification }) => (
  <div>
    <h2>Order List Page</h2>
    <label htmlFor='newNoteMsg'>Notifcation?</label>
    <input type='checkbox' name='newNoteMsg' enabled />
  </div>
);

export default OrderListPage;