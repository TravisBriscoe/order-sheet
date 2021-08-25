import React from 'react';

import './about.styles.scss';

const AboutPage = () => {

  return (
    <div className='about-content'>
      <div className='about-content-copyright'>&copy; 2021, Walrus Enterprises/<a href='https://github.com/TravisBriscoe/order-sheet' target='_blank' rel="noreferrer">Travis Briscoe</a></div>
      <br />
      <div className='about-content-favicon'>Favicon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <br />
      <div>
        <p>Created using ReactJS, Redux, and FireBase.<br />All Rights Reserved.</p>
        <br />
        <div className='about-content--contact-me'><a href='mailto:travis.briscoe@gmail.com'>Contact Me!</a></div>
      </div>
    </div>
  )
}

export default AboutPage;