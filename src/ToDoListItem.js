import React, { Component } from 'react';

// takes care of each individual to do item
// each item needs to take a checkbox to see if completed or not
// each item also needs a checkbox to mark if it is completed and to be checked when completed
class ToDoListItem extends Component {

  render() {
    let { todoItem } = this.props


    const styles = {
      complete: {
        textDecorationLine: 'line-through'
      },
      incomplete: {
        textDecorationLIne: 'line-through'
      }
    }
    let strikethrough = todoItem.complete ? styles.complete : styles.incomplete

    return (
      <div className='container-fluid'>
        <li>
          <span style={strikethrough}>{todoItem.task}</span>
          <input type='checkbox' id='task-checkbox' checked={todoItem.complete ? true : false}
            onClick={() => { this.props.toggle(this.props.index) }} >
          </input>
        </li>
      </div>
    )
  }
}


export default ToDoListItem;
