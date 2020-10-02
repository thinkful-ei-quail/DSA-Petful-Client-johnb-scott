import React from 'react';
import config from '../config'
import People from '../Components/People/People';
import Pets from '../Components/Pets/Pets';
import EnterQueue from '../Components/EnterQueue/EnterQueue'

export default class MainPage extends React.Component {
  state = {
    pets: {},
    people: [],
    name: ''
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.value
    })
  }

  handleNameSubmit = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: this.state.name})
    })
    .then(res => res.json())
    .then(resJson => {
      this.setState({
        people: [...this.state.people, resJson],
      })
    })
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
        <EnterQueue handleSubmit={this.handleNameSubmit} handleChange={this.handleNameChange}/>
        <Pets pets={pets}/>
        <People people={people}/>
      </div>
    )
  }
}