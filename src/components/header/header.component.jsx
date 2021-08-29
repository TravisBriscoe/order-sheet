import React from 'react';
import { Link, withRouter } from "react-router-dom";

import './header.styles.scss';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.userClickedManageUserLink = this.userClickedManageUserLink.bind(this);

    this.state = {
      status: null,
      loggedInUser: this.props.loggedInUser,
      notification: this.props.notification,
    }
  }

  componentDidMount() {
    if (this.state.notification === true && this.state.loggedInUser === 'manager') {
      alert('Products added to Order Sheet!');
      return this.props.setNotification(this.state.notification);
    }
  }

  userClickedManageUserLink(event) {
    const { loggedInUser } = this.props;

    if (loggedInUser === 'worker') {
      event.preventDefault();
      return console.log('Logout!');
    } else {
      return;
    }
  }

  render() {
    const { loggedInUser, title = 'Portsmouth Tavern' } = this.props;

    return (
      <div className="header" >
        <div className="header-title-user">
          {
            loggedInUser ?
              (<Link to={{ pathname: '/manage', state: { loggedInUser } }} onClick={this.userClickedManageUserLink}>User: {loggedInUser}</Link>)
              : (<Link to='/'>Login</Link>)
          }
        </div>
        <h2 className="header-title-main"><Link to='/'>{title}</Link></h2>
        <div className="header-title-recipes"><Link to='/recipes'>Recipes</Link></div>
      </div>
    )
  }
};

export default withRouter(Header);