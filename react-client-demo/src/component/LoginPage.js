import React, { Component } from 'react';
import logo from './logo.svg';
import './Login.css';
import 'whatwg-fetch';
import {userLogin} from '../util/soical-media-api'
import LoginHeader from './LoginHeader'
import LogoutHeader from './LogoutHeader'
import {browserHistory} from 'react-router'

class LoginPage extends Component {
  constructor(){
    super()
    //this.props.dispatch(userActions.logout());
    this.state = {username:"",
                  password:"",
                  submitted:false,
                  userLoggedin :false};
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  handleChange(e){
    //console.log(e.target.value);
    this.setState({ [e.target.name] : e.target.value });
  }
  handleLoginSubmit(e){
    e.preventDefault();
    this.setState({submitted:true});
    const fetch_object = {};
    fetch_object["username"] = this.state.username;
    fetch_object["password"] = this.state.password;
    
    //login using backend social-media-api
    userLogin().then (
        (response) => {
          if(response.status!==200){
              console.log("status code is："+response.status);
              return;
          }
          response.json().then((result) => {
            console.log(result);
            if (result.statusCode === "1"){
              this.setState({
                userLoggedin : true
              });
              alert("successfully login");
              console.log(this.state.userLoggedin);
              console.log("log in success");
              const path = `/main`;
              browserHistory.push(path);
            } else if (result.statusCode === "-1"){
                alert("incorrect username or password");
                console.log("log in failed");
            } else if (result.statusCode === "-2"){
                console.log("database error");
            } else{
              console.log("res_login_first");
            }
          });
        }).catch((err) => {
            alert("backend service failed ");
            console.log("Fetch error:"+err);
          });
  }
  handleLogoutSubmit(e){
    e.preventDefault();
    const fetch_object = {};
    fetch_object["username"] = this.state.username;
    fetch_object["password"] = this.state.password;
  
    //login using backend social-media-api
    var url = "http://localhost:3001/user/logout";
    return fetch(url,{
        method : "POST",
        body: JSON.stringify(fetch_object),
        headers:{
              'Content-Type': 'application/json'
            }
      }).then (
        (response) => {
          if(response.status!==200){
              console.log("status code is："+response.status);
              return;
          }
          response.json().then((result) => {
            console.log(result);
            if (result.statusCode === "1"){
              this.setState({
                userLoggedin : true
              });
              alert("successfully login");
              console.log(this.state.userLoggedin);
              console.log("log in success");
              
            } else if (result.statusCode === "-1"){
                alert("incorrect username or password");
                console.log("log in failed");
            } else if (result.statusCode === "-2"){
                console.log("database error");
            } else{
              console.log("res_login_first");
            }
          });
        }).catch((err) => {
            alert("backend service failed ");
            console.log("Fetch error:"+err);
          });
  }
  render() {
    return (
      <div >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">social-media project by React.</h1>
        </header>
        {this.state.userLoggedin ?
          (<LoginHeader userId={this.state.username} />) :
          (<LogoutHeader />)
        }
        <div className="col-md-6 col-md-offset-3">
          <h2>Login</h2>
          <form name="form" onSubmit={this.handleLoginSubmit}>
              <div >
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} />
                  {this.state.submitted && !this.state.username &&
                      <div >Username is required</div>
                  }
              </div>
              <div >
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                  {this.state.submitted && !this.state.password &&
                      <div >Password is required</div>
                  }
              </div>
              <div className="form-group">
                  <button className="btn btn-primary">Login</button>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
