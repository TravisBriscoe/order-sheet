import React from 'react';

import { withRouter } from 'react-router-dom';

import './manage.styles.scss';

const ManagePage = () => (
  <div className='manage-content'>
    <h2>Product/User Management</h2>
  </div>
)

export default withRouter(ManagePage);