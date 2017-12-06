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

export default class LogoutForm extends Component<{}> {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      error: ''
    }
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress() {
    firebase.auth().signOut()
      .catch(() => this.setState({ error: 'Error logging out'}))
      .then(() => this.setState({ error: '' }));
  }

  render() {
    const { error } = this.state;
    return (
      <Card>
        <Text
        style={styles.errorTextStyle}>
          { error }
        </Text>
        <CardSection>
        {
          !this.state.loading ? 
          <Button
            onPress={this.handleButtonPress}
          >Log out</Button> : 
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
