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
  View,
  TextInput
} from 'react-native';
import firebase from 'firebase';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';

export default class LoginForm extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress() {
    const { email, password, loading } = this.state;
    this.setState({error: '', loading: true});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.onLoginSuccess())
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => this.onLoginSuccess())
          .catch((error) => {
            console.log(error);
            this.onLoginFail()})
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication failed',
      loading: false
    })
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email:"
            placeholder="Please input email"
            secureTextEntry={false}
            value={this.state.email}
            onChangeText={email => this.setState({ email })} />
        </CardSection>

        <CardSection>
          <Input 
            label="Password:"
            placeholder="Please input password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })} />
        </CardSection>

        <Text
        style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
        {
          !this.state.loading ? 
          <Button
            onPress={this.handleButtonPress}
          >Log in</Button> : 
          <Spinner size="small"/>
        }
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
});
