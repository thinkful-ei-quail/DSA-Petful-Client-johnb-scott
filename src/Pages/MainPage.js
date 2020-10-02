import React from 'react';
import config from '../config'
import People from '../Components/People/People';
import Pets from '../Components/Pets/Pets';

export default class MainPage extends React.Component {
  state = {
    pets: {},
    people: []
  }

  componentDidMount = () => {
    this.getPeople();
    this.getPets();
  }

  getPeople = () => {
    fetch(`${config.API_ENDPOINT}/people`)
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        this.setState({
          people: resJson
        })
      })
  }

  getPets = () => {
    fetch(`${config.API_ENDPOINT}/pets`)
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        this.setState({
          pets: resJson
        });
      })
  }

  render() {
    const {people, pets} = this.state;
    return (
      <div className='Main-Page'>
        <Pets pets={pets}/>
        <People people={people}/>
      </div>
    )
  }
}