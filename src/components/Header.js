import React from 'react';

// stateless component
const Header = (props) => {
  return (
    <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day
    </h1>
    <h5 className="tagline">
      <span>{props.tagline}</span>
    </h5>
    </header>
  )
}


export default Header;
