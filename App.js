import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ServiceApi from './ServiceApi';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to search artist!"
          onChangeText={(text) => this.setState({ text })}
        />
        <Button
          onPress={onPressLearnMore}
          title="Search"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
