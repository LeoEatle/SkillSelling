import React, { Component } from 'react';
import {
  render
} from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import SiteFooter from './components/SiteFooter';
import MenuInstance from './components/MenuInstance';
import Navbar_bs from './components/Navbar_bs'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const App = React.createClass({
  getInitialState: function () {
    return{
      logged: this.checklogged(),
    }
  },

  checklogged: function () {
    let username = localStorage.getItem('username');
    if(username != null){
      console.log('now the user is ' + username);
    }
    return username || null;
  },

  onlogin: function (username) {
    localStorage.setItem('username',username);
    this.setState({logged: username });
  },

  render: function () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="ask-page">
          <Navbar_bs username={this.state.logged}></Navbar_bs>
          <MenuInstance />
          <main className="ask-main">
            {this.props.children}
          </main>
          <SiteFooter />
        </div>
      </MuiThemeProvider>
    );
  }
});

// Pages
import Index from './pages/Index';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Category from './pages/Category';
//import userRegister from './pages/userRegister';
import sellerRegister from './pages/sellerRegister';
import ServiceDetail from './pages/ServiceDetail';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
      {/*<Route path="/userRegister" component={userRegister} />*/}
      <Route path="/sellerRegister" component={sellerRegister} />
      <Route path="/Categories/:category" component={Category} />
      <Route path="/details/:userid/:serviceid" component={ServiceDetail} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(routes, document.getElementById('root'));
});
