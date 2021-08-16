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
    console.log(this.props)
    const {userLoggedIn} = this.props;

    if (userLoggedIn === 'Worker') {
      event.preventDefault();
      return console.log('Logout!');
    } else {
      return;
    }
  }

  render() {
    const { isUserLoggedIn, userLoggedIn, title = 'Portsmouth Tavern' } = this.props;
    console.log(userLoggedIn);

    return (
      <div className={`header ${!isUserLoggedIn ? "is-blurred" : ""}`} >
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