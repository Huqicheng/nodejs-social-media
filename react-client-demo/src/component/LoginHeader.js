import React, { Component } from 'react';
import './App.css'
class LoginHeader extends Component {

  render() {
    return (
      <h1 className = "App"> 
        Thanks for logging in, {this.props.userId}
      </h1>
    );
  }
}

export default LoginHeader;