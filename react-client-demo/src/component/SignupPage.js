import React, { Component } from 'react';
import logo from './logo.svg';
import './Signup.css';
import 'whatwg-fetch';
import {userLogin} from '../util/soical-media-api'
import LoginHeader from './LoginHeader'
import LogoutHeader from './LogoutHeader'

class LoginPage extends Component {
  constructor(){
    super()
    //this.props.dispatch(userActions.logout());
    this.state = {username:"",
                  password:"",
                  password_confirm:"",
                  submitted:false,
                  userRegistered :false};
    this.handleChange = this.handleChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }
  handleChange(e){
    //console.log(e.target.value);
    this.setState({ [e.target.name] : e.target.value });
  }
  handleRegisterSubmit(e){
    e.preventDefault();
    this.setState({submitted:true});
    const fetch_object = {};
    fetch_object["username"] = this.state.username;
    fetch_object["password"] = this.state.password;
    
    //login using backend social-media-api
    /*
    userRegister().then (
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
          */
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
          <h2>Sign up</h2>
          <form name="form" onSubmit={this.handleRegisterSubmit}>
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
              <div >
                  <label htmlFor="password_confirm">Confirm Your Password</label>
                  <input type="password" className="form-control" name="password_confirm" value={this.state.password_confirm} onChange={this.handleChange} />
                  {this.state.submitted && !(this.state.password == this.state.password_confirm) &&
                      <div >Please confirm your password</div>
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
