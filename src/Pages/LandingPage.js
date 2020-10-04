import React from 'react'
import { Link } from 'react-router-dom'
import pets from '../images/pets.jpg'
import './LandingPage.css'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className='LandingPage'>
        <h2>Find the perfect pet for you!</h2>
        <img src={pets} alt='Cat and dog sitting together'/>
        <p>Petful is a pet adoption website that ensures pets don't wait too long to get adopted</p>
        <p>Pets that arrive here are placed in a queue and are adopted on a first in first out basis.</p>
        <p>If you would like to adopt a pet you will be placed in line, once it is your turn you will have the option to adopt the currently available dog, cat, or both.</p>
        <Link className='btn' to='/main'>Get Started</Link>
      </div>
    )
  }

}
