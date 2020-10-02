import React from 'react'

export default class EnterQueue extends React.Component {

  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e)}>
        <label htmlFor='name'>Enter your name</label>
        <input type='text' id='name' onChange={(e) => this.props.handleChange(e.target)} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}