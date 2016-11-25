import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter, Miss, Match } from 'react-router';

import './css/style.css';
// import './css/blurb.css';

import App from './components/App';
import NotFound from './components/NotFound';
import BlurbDashboard from './components/BlurbDashboard';


const Root = () => {
  return(
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={BlurbDashboard}/>
        <Match exactly pattern="/dashboard/:dashboardId" component={App}/>
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}
render(<Root/>, document.querySelector('#main'));
