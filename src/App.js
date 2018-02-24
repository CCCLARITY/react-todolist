import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import './reset.css';
import './index.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: [
      ]
    }
  }

  render() {
    let todos = this.state.todoList.map((item, index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item}/>
        </li>
      )
    })
    
    return (
      <div className="App">
        <h1>我的时间清单</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)} 
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }

  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }

  addTodo(event){
    this.state.todoList.push({
      id: idAdd(),
      title: event.target.value,
      status: null,
      delete: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }

  

}

export default App;

let id = 0
function idAdd(){
  id += 1;
  return id;
}