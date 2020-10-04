import React from 'react';

import './Pets.css'


export default class Pets extends React.Component {
  
  displayNextDog = () => {
    const {dog} = this.props.pets;
    if (dog !== undefined) {
      return this.petHtml(dog[0]);
    } else {
    return 'No Dog Available';
    }
  }
  displayNextCat = () => {
    const {cat} = this.props.pets;
    if (cat !== undefined) {
      return this.petHtml(cat[0]);
    } else {
    return 'No Cat Available'
    }
  }
  petHtml = (pet) => {
    return <div className='pet-container'>
      <h3>{pet.name}</h3>
      <p>Age: {pet.age}</p>
      <p>Gender: {pet.gender}</p>
      <p>Breed: {pet.breed}</p>
      <img src={pet.imageURL} alt={pet.description} />
      <p>Description: {pet.description}</p>
      <p>Why they are here: {pet.story}</p>
    </div>
  }
  render() {
    return (
      <div className="Pets">
        {this.displayNextDog()}
        {this.displayNextCat()}
      </div>
    )
  }
}