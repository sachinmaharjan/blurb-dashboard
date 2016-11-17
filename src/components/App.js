import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

class App extends React.Component {

  render() {
    //jsx you can only return one element like form
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh SeaFood Market"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    )
  }
}

export default App;
