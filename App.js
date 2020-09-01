import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Store from './src/store';
import Home from './src/navigation/MovieNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Home />
      </Provider>
    );
  }
}
