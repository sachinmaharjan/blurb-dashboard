import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
//import firebase
import base from '../base'

class App extends React.Component {
  constructor() {
    super();
    //binding the functions here
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    //get initital state
    this.state = {
      fishes: {},
      order: {}
    };
  }
  //https://github.com/tylermcginnis/re-base#syncstateendpoint-options
  componentWillMount() {
    const syncLink = `${this.props.params.dashboardId}/fishes`;
    this.ref = base.syncState(syncLink, {
      context: this,
      state: 'fishes',
      asArrat: true
    });
  }
  //https://github.com/tylermcginnis/re-base#syncstateendpoint-options
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addFish(fish) {
    console.log('Adding Fish');
    //update state
    //... is spread in es6
    const fishes = {...this.state.fishes};
    //make unique id with timestamp
    const timestamp = Date.now();

    //add in our new fish
    fishes[`fish-${timestamp}`] = fish;

    //set state
    this.setState({fishes});
  }

  addToOrder(key) {
    //take copy of order state
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  render() {
    //jsx you can only return one element like form
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Freshly Refresh"/>
          <ul className="list-of-fishes">
            { Object
              .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
