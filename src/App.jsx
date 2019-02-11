import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import FirstPageComponent from './FirstPageComponent/FirstPageComponent';
import AllPostComponent from './AllPostComponent/AllPostComponent';
import CommentsComponent from './CommentsComponent/CommentsComponent';
import style from './App.module.css';

class App extends Component {

  state = {
    inputValue: '',
  }

  hanndleChangeInput = (evt) => {
    this.setState({
      inputValue: evt.target.value,
    })
  }

  render() {
    return (
      <div className={style.App}>

        <Switch>
          <Route exact path='/' render={(props) => <FirstPageComponent {...props} hanndleChangeInput={this.hanndleChangeInput} value={this.state.inputValue}/>} />
          <Route path='/posts' render={(props) => <AllPostComponent {...props} author={this.state.inputValue}/>} />
          <Route path='/comments' render={(props) => <CommentsComponent {...props}/>} />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);