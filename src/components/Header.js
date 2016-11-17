import React from 'react';

class Header extends React.Component {
  render() {
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
        <span>{this.props.tagline}</span>
      </h5>
      </header>
    )
  }
}

export default Header;
