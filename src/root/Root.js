import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import LandingPage from '../Pages/LandingPage';
import './Root.css'

function Root() {
  return <div className='Root'>
    <h1>Petful</h1>
    <Switch>
      <Route 
        exact path="/"
        component={LandingPage}
      />
      <Route
        path={"/main"}
        component={MainPage}
        />
    </Switch>
  </div>
}

export default Root
