import React from 'react';
import { Link, withRouter } from "react-router-dom";

import './header.styles.scss';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.userClickedManageUserLink = this.userClickedManageUserLink.bind(this);

    this.state = {
      status: null,
    }
  }

  userClickedManageUserLink(event) {
    const {userLoggedIn} = this.props;

    if (userLoggedIn === 'Worker') {
      event.preventDefault();
      return console.log('Logout!');
    } else {
      return;
    }
  }

  render() {
    const { userLoggedIn, title = 'Portsmouth Tavern' } = this.props;

    return (
      <div className="header" >
        <div className="header-title-user">
          {
            userLoggedIn ?
              (<Link to={{ pathname: '/manage', state: { userLoggedIn } }} onClick={this.userClickedManageUserLink}>User: {userLoggedIn}</Link>)
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