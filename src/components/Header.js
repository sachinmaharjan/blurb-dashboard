import React from 'react';

// stateless component
const Header = (props) => {
  return (
    <header className="top">
    <h2>
      Blurb DashBoard
    </h2>
    <h5 className="tagline">
      <span>{props.tagline}</span>
    </h5>
    </header>
  )
}


export default Header;
