import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import './index.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';
import LoginPage from './component/LoginPage';
import MainPage from './component/MainPage';
//ReactDOM.render(<App />, document.getElementById('root'));
//import 'bootstrap/dist/css/bootstrap.min.css';

//ReactDOM.render(<LoginPage />, document.getElementById('loginpage'));

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={LoginPage}/>
      <Route path="/main" component={MainPage}/>
    </Route>
  </Router>
), document.getElementById('mainpage'))
registerServiceWorker();
