import React, { Component } from 'react';
import './App.css'
class LoginHeader extends Component {

  render() {
    return (
      <h1 className = "App"> 
        Thanks for registering, {this.props.userId}
      </h1>
    );
  }
}

export default LoginHeader;