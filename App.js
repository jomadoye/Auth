/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import Header from './app/components/common/Header';
import Spinner from './app/components/common/Spinner';
import LoginForm from './app/components/LoginForm';
import LogoutForm from './app/components/LogoutForm';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: null,
    };
  }

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyA21aPG3U0SABaMP2aOok0d1wY2pRIYUWA",
      authDomain: "auth-6660f.firebaseapp.com",
      databaseURL: "https://auth-6660f.firebaseio.com",
      projectId: "auth-6660f",
      storageBucket: "auth-6660f.appspot.com",
      messagingSenderId: "677950424278"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      user ? this.setState({ isLoggedIn: true }) : this.setState({ isLoggedIn: false });
    });
  }

  renderContent() {
    switch(this.state.isLoggedIn) {
      case true:
        return <LogoutForm />;
     case false:
        return <LoginForm />;
    default:
        return (
          <View style={styles.spinner}>
            <Spinner />
          </View> 
        );
    } 
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        { this.renderContent() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    // fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
  },
  instructions: {
    // textAlign: 'center',
    // color: '#333333',
    // marginBottom: 5,
  },
});
