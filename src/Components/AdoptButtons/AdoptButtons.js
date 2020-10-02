import React from 'react';

export default class AdoptButtons extends React.Component {
  render() {
    return (
      <div className="Adopt-Buttons">
        <button className="adopt-cat">Adopt Cat</button>
        <button className="adopt-dog">Adopt Dog</button>
        <button className="adopt-both">Adopt Both!</button>
      </div>
    )
  }
}