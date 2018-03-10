import React, { Component } from 'react';
import './App.css';
import { Button, Card, Row, Col } from 'react-materialize';
import NewToDo from './NewToDo';
import ToDoListItem from './ToDoListItem';
import axios from 'axios'
import { Query } from 'mongoose';


// will take in a list of to do items in list form 
class ToDoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
     todoItems: []
    }
  }

  // function to get todos
  getToDos = () => {
    axios.get('http://localhost:4444/')
      .then((res) => {
        console.log(JSON.parse(res.body))
        this.setState({
          //todoItems: this.state.todoItems.push(JSON.parse(res.data))
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }

  // Function to add new item
  addItem = (event) => {
    event.preventDefault()
    
    let newTask = {task: event.target.task.value, complete: false}
    
    // add new to do item to component render
    // come back and add error handling for empty to do task string
    axios.post('http://localhost:4444/add', {task: newTask.task, complete: newTask.complete})
      .then((response) => {
        console.log(response.data)
        let todoItems = this.state.todoItems.unshift(response.data)
        this.setState({
          todoItems: this.state.todoItems
        })
      });  
    
    event.target.task.value = ''
    //console.log(this.state.todoItems)
  } 

  // Function to Toggle complete state//
  toggle = (_id) => {
    console.log(this.state.todoItems)
    this.state.todoItems[_id].complete = !this.state.todoItems[_id].complete
    
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

  // axios request for todos stored on database <3
  componentWillMount(){
    axios.get('http://localhost:4444/')
      .then((req, res) => {
        console.log(req.data)
        // let todos = req.data
        this.setState({
          todoItems: req.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }

  // Render App Below
  render() {
    return (
      <div className='container-fluid main-app'>
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
    let todoItems = this.props.todoItems
    console.log(todoItems)
    let todoItemsJSX = todoItems.map((todoItem) => {
      return <ToDoListItem 
        todoItem={todoItem} key={todoItem._id} toggle={this.props.toggle} />
        
    })
    console.log(todoItems)
    return (
      <div className='container-fluid'>
        <ul>
          {todoItemsJSX}
        </ul>
      </div>
    )
  }
}


export default ToDoApp;
