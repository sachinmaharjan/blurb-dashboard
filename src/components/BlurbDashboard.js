import React from 'react';
import { render } from 'react-dom';

class BlurbDashboard extends React.Component {

  render() {
    //jsx you can only return one element like form
    return (
      <form className='blurb-dashboard'>
        { /* jsx  render*/ }
        <h2>Please Enter Dashboard</h2>
        <input type="text" required placeholder="Enter Dashboard Name"/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default BlurbDashboard;
