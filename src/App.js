import React, { Component } from 'react';
import './App.css';
import NewToDo from './NewToDo';

// will take in a list of to do items in list form 
class ToDoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
     todoItems: [
       {task: 'buy flowers', complete: false},
       {task: 'get high', complete: false },
       {task: 'eat food', complete: false},
       ]
    }
  }
  
  // Function to add new item
  addItem = (event) => {
    event.preventDefault()
    
    let newTask = {task: event.target.task.value, complete: false}
    let todoItems = this.state.todoItems
    todoItems.unshift(newTask)
    
    this.setState({
      todoItems: todoItems
      
    })
    event.target.task.value = ''
  } 

  // Function to Toggle complete state//
  toggle = (index) => {
    
    this.state.todoItems[index].complete = !this.state.todoItems[index].complete
    
      this.setState({
      todoItems: this.state.todoItems
    })
  }

  // Function to clear list of completed todos
  // tie to button event handler
  clearComplete = () => {

    let notCompletedItems = this.state.todoItems.filter(todoItems => todoItems.complete == false)
    
    console.log(notCompletedItems);
    this.setState ({
      todoItems: notCompletedItems
    })
  }
 
  // Render App Below
  render() {
    return (
      //console.log('this will help you get things done')
      <div className='container-fluid'>
          <header className="App-header">
            <h1 className="App-title"> ～ 死 ～ 死 ～ 死 ～ </h1>
            <h1 className="App-title"> ～ 四 ～ 四 ～ 四 ～ </h1>
            <h1 className="App-title"> ～ 死 ～ 死 ～ 死 ～ </h1>
          </header>
        <main>
        <NewToDo addItem={this.addItem}/>
        <ToDoList toggle={this.toggle} todoItems={this.state.todoItems}/>
        <button onClick={this.clearComplete} > clear completed items </button>
        </main>
      </div>
    )
  }
}

// this will take in all the <ToDo /> components and output a dynamic list
class ToDoList extends Component {
  render() {
    let todoItemsJSX = this.props.todoItems.map((todoItem, i) => {
      return <ToDoListItem todoItem={todoItem} key={i} toggle={this.props.toggle} index={i}/>
    })
    return (
      //console.log('get all this done man') 
      <div>
        <ul>
          {todoItemsJSX}
        </ul>
      </div>
    )
  }
}

// takes care of each individual to do item
// each item needs to take a checkbox to see if completed or not
// each item also needs a checkbox to mark if it is completed and to be checked when completed
class ToDoListItem extends Component {

  render() {
    let { todoItem } = this.props
    return (
      <li>
        <input type='checkbox' name='checkbox' checked={todoItem.complete ? true : false}
          onClick={() => {
            this.props.toggle(this.props.index)}} >
        </input>
          {todoItem.task} 
      </li>
    )
  }
}


export default ToDoApp;
