import React from 'react';
import { render } from 'react-dom';
import { getFunName } from '../helpers';


class BlurbDashboard extends React.Component {
  // constructor() {
  //   super();
  //   this.goToDashboard = this.goToDashboard.bind(this);
  // }
  goToDashboard(event) {
    event.preventDefault();
    console.log("You have change the url");
    console.log(this.dashboardInput.value);
    // grab the txt from box


    //transition to /dashboard/dashboardId
  }
  render() {
    //jsx you can only return one element like form
    return (
      <form className='blurb-dashboard' onSubmit={(e) => this.goToDashboard(e)}>
        { /* jsx  render*/ }
        <h2>Please Enter Dashboard</h2>
        <input ref={(input) => {this.dashboardInput = input}} type="text" required placeholder="Enter Dashboard Name" defaultValue={getFunName()}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default BlurbDashboard;
