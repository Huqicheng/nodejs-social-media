import React, { Component } from 'react';
import './MainPage.css';
import 'whatwg-fetch';
import { Link } from 'react-router'
import socialmedia_imgURL from '../image/socialmedia_everywhere.png';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.handleClick= this.handleClick.bind(this);
    this.state = {testState:"false",
                  items:["asdfg"]};
  }
  handleClick(event){
    let path = `/login`;        
    this.context.router.push(path);
  }
  render() {
    return (
      <div>
        <header className="bg-image">
          <div className="container">
            <h1>Social-Media Project</h1>
            <h2>A place to share knowledge with other people.</h2>
            <Link to = "/login">
              <button className="btn" style={{marginRight: '10px'}}>Log  In </button>
            </Link>
            <Link to = "/signup">
              <button className="btn">Sign up </button>
            </Link>
          </div>
        </header>

        <section className="">
          <div className="container">
            <div className="col-3">
              <img src={socialmedia_imgURL} alt="" className="details-img--ball"/>
            </div>
            <div className={"col-7"}>
              <h1>Try our App.</h1>
              <h4>The art and science of asking question is the source of all knowledge.</h4>
            </div>
          </div>
        </section>
        <section className="section--primary">
          <div className="container">
            <div className="col-3 features">
              <i className="fa fa-bolt fa-5x"></i>
              <h2>
                Front-end: React.
              </h2>
            </div>
            <div className="col-3 features">
              <i className="fa fa-bank fa-5x"></i>
              <h2>
                Back-end: NodeJS.
              </h2>
            </div>
            <div className="col-3 features">
              <i className="fa fa-heart fa-5x"></i>
              <h2>
                More idea.
              </h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default MainPage;

