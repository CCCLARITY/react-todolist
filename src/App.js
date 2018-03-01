import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import './reset.css';
import './index.css';
import UserDialog from './UserDialog.js';
import {getCurrentUser, signOut} from './leanCloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      user: getCurrentUser() || {},
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
        <h1>{this.state.user.username||'我'}的时间清单
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button>:null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)} 
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? 
          null : 
          <UserDialog onSignUp={this.SignUpOrSignIn.bind(this)} onSignIn={this.SignUpOrSignIn.bind(this)}
          />}
      </div>
    );
  }

  signOut(){
    signOut()    // 这个signOut是leanCloud中的signOut，不加这个不能将user.id变空
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    stateCopy.todoList = []
    this.setState(stateCopy)
  }

  SignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
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