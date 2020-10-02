import React from 'react';
import config from '../config'
import People from '../Components/People/People';
import Pets from '../Components/Pets/Pets';
import EnterQueue from '../Components/EnterQueue/EnterQueue'
import AdoptButtons from '../Components/AdoptButtons/AdoptButtons';

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
      window.localStorage.setItem('petful_username', resJson)
      console.log(window.localStorage.getItem('petful_username'));
      this.setState({
        people: [...this.state.people, resJson],
      })
    })
  }

  componentDidMount = () => {
    this.getPeople();
    this.getPets();
    this.dequeuePeople();
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

  dequeuePeople = () => {
    const randomUsers = [
      'Billy Bob',
      'Han Solo',
      'Gandalf',
      'Kratos'
    ]
    setInterval(() => {
      //If current user is in front or there are no more in queue
      if ((window.localStorage.getItem('petful_username') !== this.state.people[0]) &&
        this.state.people.length > 0)
      {
        let pets = this.state.pets;
        let randomPet = ['cats', 'dogs'][Math.floor(Math.random()*2)]
        
        fetch(`${config.API_ENDPOINT}/pets`, 
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            pet: randomPet
          })
        })
        .then(() => {
          this.getPets();
        })
        fetch(`${config.API_ENDPOINT}/people`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            this.setState({
              people: this.state.people.slice(1, this.state.people.length)
            })
          })
      }
      else if (this.state.people.length < 5) {
        fetch(`${config.API_ENDPOINT}/people`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(
            {
              name: randomUsers[Math.floor((Math.random()*4))]
            }
          )
        })
        .then(res => res.json())
        .then(resJSON => {
          this.setState({
            people: [...this.state.people, resJSON]
          })
        });
      }
    }, 5000)
  }

  render() {
    const {people, pets} = this.state;
    return (
      <div className='Main-Page'>
        <EnterQueue handleSubmit={this.handleNameSubmit} handleChange={this.handleNameChange}/>
        <Pets pets={pets}/>
        {window.localStorage.getItem('petful_username') === this.state.people[0] && <AdoptButtons />}
        <People people={people}/>
      </div>
    )
  }
}