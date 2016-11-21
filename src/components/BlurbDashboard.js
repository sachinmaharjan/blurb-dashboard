import React from 'react';
import { getFunName } from '../helpers';


class BlurbDashboard extends React.Component {
  // constructor() {
  //   super();
  //   this.goToDashboard = this.goToDashboard.bind(this);
  // }
  goToDashboard(event) {
    event.preventDefault();
    // grab the txt from box
    const dashboardId = this.dashboardInput.value;
    //transition to /dashboard/dashboardId
    this.context.router.transitionTo(`/dashboard/${dashboardId}`);
  }

  render() {
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

BlurbDashboard.contextTypes = {
  router: React.PropTypes.object
}

export default BlurbDashboard;
