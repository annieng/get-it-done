import React, { Component } from 'react';
import './App.css';
import { Button, Card, Row, Col } from 'react-materialize';
import NewToDo from './NewToDo';
import ToDoListItem from './ToDoListItem';

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


export default ToDoApp;
