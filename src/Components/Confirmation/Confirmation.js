import React from 'react'

export default class Confirmation extends React.Component {
  render() {
    const {petType, handleClose} = this.props
    return (
      <div className='confirmation_box'>
        <h3>Congrats!</h3>
        <p>Enjoy the company of your new {petType}!</p>
        <button onClick={() => handleClose(petType)}>Close</button>
      </div>
    )
  }
}