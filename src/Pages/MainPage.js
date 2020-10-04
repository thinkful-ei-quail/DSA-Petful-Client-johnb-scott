import React from 'react';
import config from '../config'
import People from '../Components/People/People';
import Pets from '../Components/Pets/Pets';
import EnterQueue from '../Components/EnterQueue/EnterQueue'
import AdoptButtons from '../Components/AdoptButtons/AdoptButtons';
import Confirmation from '../Components/Confirmation/Confirmation';

import ApiService from '../ApiService/ApiService'

export default class MainPage extends React.Component {
  state = {
    pets: {},
    people: [],
    name: '',
    adopted: ''
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
      body: JSON.stringify({ name: this.state.name })
    })
      .then(res => res.json())
      .then(resJson => {
        window.localStorage.setItem('petful_username', resJson)
        console.log(window.localStorage.getItem('petful_username'));
        this.setState({
          people: [...this.state.people, resJson],
        })
      })

      this.dequeuePeople()
  }

  componentDidMount = () => {
    this.getPeople();
    this.getPets();
    //this.dequeuePeople();
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
      console.log('interval')
      //If current user is in front or there are no more in queue
      if ((window.localStorage.getItem('petful_username') !== this.state.people[0]) &&
        this.state.people.length > 0) {

        let randomPet = ['cats', 'dogs'][Math.floor(Math.random() * 2)]
          Promise.all([ApiService.removeRandomPet(randomPet), ApiService.removeFrontPerson()])
            .then(() => {
              if(randomPet === 'cats') {
              this.setState({
                pets: {
                  cat: [...this.state.pets.cat.slice(1)],
                  dog: [...this.state.pets.dog]
                },
                people: this.state.people.slice(1)
              })
            } else if(randomPet === 'dogs') {
              this.setState({
                pets: {
                  cat: [...this.state.pets.cat],
                  dog: [...this.state.pets.dog.slice(1)]
                },
                people: this.state.people.slice(1)
              })
            }
            })
            .catch( e => {
                console.log(e)
              })
      }
      else if (this.state.people.length < 5) {
        let randomPerson = randomUsers[Math.floor((Math.random() * 4))]

        ApiService.addRandomPerson(randomPerson)
          .then(() => {
              this.setState({
                people: [...this.state.people, randomPerson]
              })
            }
          )
          .catch(e => console.log(e))
      }
    }, 5000)
  }

  closeConfirmation = (pet) => {
    if(pet === 'cat and dog') {
      this.dequeueAnimal('dogs')
      this.dequeueAnimal('cats')
    } else {
      let plural = pet + 's'
      this.dequeueAnimal(plural)
    }
    this.dequeuePerson()
    this.setState({
      adopted: ''
    })

  }

  adoptCat = () => {
    this.setState({
      adopted: 'cat'
    })
  }

  adoptDog = () => {
    this.setState({
      adopted: 'dog'
    })
  }

  adoptBoth = () => {
    this.setState({
      adopted: 'cat and dog'
    })
  }

  dequeuePerson = () => {
    fetch(`${config.API_ENDPOINT}/people`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
          people: this.state.people.slice(1)
        })
      })
      .then(() => {
        this.getPets();
      })
  }

  dequeueAnimal = (pet) => {
    console.log(pet)
    fetch(`${config.API_ENDPOINT}/pets`,
          {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              pet
            })
          })
  }

  render() {
    const { people, pets, adopted } = this.state;
    return (
      <div className='Main-Page'>

        <Pets pets={pets} />
        {window.localStorage.getItem('petful_username') === this.state.people[0]
          && <AdoptButtons
            adoptCat={this.adoptCat}
            adoptDog={this.adoptDog}
            adoptBoth={this.adoptBoth}
          />}
        <EnterQueue handleSubmit={this.handleNameSubmit} handleChange={this.handleNameChange} />
        {adopted 
          && <Confirmation 
            petType={adopted} 
            handleClose={this.closeConfirmation}
            dequeuePerson={this.dequeuePerson}
            dequeueAnimal={this.dequeueAnimal}
             />}
        <People people={people} />
      </div>
    )
  }
}
