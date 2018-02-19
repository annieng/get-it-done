import React, { Component } from 'react';

class NewToDo extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.addItem}>
          <input
            type='text'
            name='task'
          />
          <button type='submit'>add</button>
        </form>
      </div>
    )
  }
}

export default NewToDo;