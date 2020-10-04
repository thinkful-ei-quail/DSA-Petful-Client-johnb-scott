import React from 'react';
import './People.css'

export default class People extends React.Component {
  displayPeople = () => {
    const {people} = this.props
    if (people && people.length > 0) {
      return <ul className="people-list">{this.htmlPeople(people)}</ul>
    }
    return 'Nobody in queue'
  }
  htmlPeople = (people) => {
    return people.map((person, i) => {
      return <li key={i} className="people-list-item">{person}</li>
    });
  }
  render() {
    return (
      <div className="People">
        {this.displayPeople()}
      </div>
    );
  }
}