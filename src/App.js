import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import './reset.css';
import './index.css';
import * as localStorage from './localStorage';
import UserDialog from './UserDialog.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: []
    }
  }

  render() {
    let todos = this.state.todoList.filter((item)=>!item.delete).map((item, index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} 
            onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)}/>
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
        <ol className="todoList">
          {todos}
        </ol>
        <UserDialog />
      </div>
    );
  }

  componentDidUpdate(){
    
  }

  delete(e, todo){                      //点击按钮，将事项的删除属性设置为true
    todo.delete = true
    this.setState(this.state)
    
  }

  toggle(e, todo){                         //实现的是当点击复选框时实现状态的改变
    todo.status = todo.status === 'completed' ? '':'completed'
    this.setState(this.state)
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