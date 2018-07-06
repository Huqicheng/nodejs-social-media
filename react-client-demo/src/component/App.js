import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
  constructor(){
    super()
    this.state = {isLoaded:"false",
                  items:["asdfg"]};
    this.fetchUsers = this.fetchUsers.bind(this);
  }
  fetchUsers(){
    var fetch_url = "http://localhost:3001/user/test_non_parameter";
    return fetch(fetch_url,{
            method : "GET",
        }).then (
          response=>{
            if(response.status!==200){
                console.log("status code is："+response.status);
                return;
            }
            response.json().then((result)=>{
                this.setState({
                    items:["fetch","test"],
                    isLoaded:"true",
                });
                console.log(result);
            });
          }).catch((err)=>{
                console.log("Fetch error:"+err);
            });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">social-media project by React </h1>
        </header>
        <p className="App-intro" >
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
        <button type="button" onClick = {this.fetchUsers.bind(this)}>Click Me!</button>
        </div>
        <textarea id="result" readOnly cols="50" rows="20" >
        </textarea>
        <p className = "App-intro">
        Is loaded : {this.state.isLoaded} Content : {this.state.items}
        </p>
      </div>
    );
  }
}

export default App;
