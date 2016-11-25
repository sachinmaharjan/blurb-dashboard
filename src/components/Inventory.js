import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user});
      }
    })
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    console.log(`trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    //grab the srore info
    const storeRef = base.database().ref(this.props.dashboardId);
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      //claim it as our own if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  logout() {
    console.log('Logging out');
    base.unauth();
    this.setState({
      uid: null
    });
  }

  renderLogin() {
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store Inventory</p>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log in with Twitter</button>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
      </nav>
    )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return(
      <div className="fish-edit" key={key}>
        <input type="text" placeholder="Fish Name" name="name" value={fish.name} onChange={(e) => this.handleChange(e, key)}/>
        <input type="text" placeholder="Fish Price" name="price" value={fish.price} onChange={(e) => this.handleChange(e, key)}/>
        <select type="text" placeholder="Fish Status" name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" placeholder="Fish Description"  name="desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)}/>
        <input type="text" placeholder="Fish Image" name="image" value={fish.image} onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>
    //check if ther are not logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>sorry, you are not the owner!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h3>Inventory</h3>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Samples</button>
      </div>
    )
  }
}

//validations for where ever props is declared
Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
}

export default Inventory;
