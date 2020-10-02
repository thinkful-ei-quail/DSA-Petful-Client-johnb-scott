import React from 'react';
import config from '../../config';

export default class Pets extends React.Component {
  displayPets = () => {
    const { pets } = this.props;
    const dog = pets.dog;
    const cat = pets.cat;
  }
  displayNextDog = () => {
    const {dog} = this.props.pets;
    if (dog) {
      console.log(dog);
      return this.petHtml(dog);
    }
    return 'No Dog Available';
  }
  displayNextCat = () => {
    const {cat} = this.props.pets;
    if (cat) {
      return this.petHtml(cat);
    }
    return 'No Cat Available'
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