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
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    //get initital state
    this.state = {
      fishes: {},
      order: {}
    };
  }
  //https://github.com/tylermcginnis/re-base#syncstateendpoint-options
  componentWillMount() {
    //this runs right before app is update
    const syncLink = `${this.props.params.dashboardId}/fishes`;
    this.ref = base.syncState(syncLink, {
      context: this,
      state: 'fishes',
      asArrat: true
    });

    //check if there is any reference to localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.dashboardId}`)
    if(localStorageRef) {
      //update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }
  //https://github.com/tylermcginnis/re-base#syncstateendpoint-options
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.dashboardId}`, JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
    this.removeFromOrder(key);
  }

  addToOrder(key) {
    //take copy of order state
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    //jsx you can only return one element like form
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={"Fresh Market"}/>
          <ul className="list-of-fishes">
            { Object
              .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes} order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
          />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}/>
      </div>
    )
  }
}

//validations for where ever props is declared
App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
