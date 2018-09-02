import React from 'react';
import {
  StatusBar, Button, TextInput, Image,
  FlatList, StyleSheet, Text, View
} from 'react-native';
import ServiceApi from './ServiceApi';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: 'Enter name to search artist', artistdata: '', artistevents: [] };
    this.searchartist = this.searchartist.bind(this);
  }


  searchartist() {
    ServiceApi.getData(this.state.name).
      then((data) => this.setState({ artistdata: data }));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Type here to search artist!"
          onChangeText={(text) => this.setState({ name: text })}
        />
        <Button
          onPress={this.searchartist}
          title="Search"
          color="#841584"
          accessibilityLabel="Search Artist"
        />
        <Text>Results</Text>
        <Text style={styles.textview}>{this.state.artistdata.name}</Text>
        <Image source={{ uri: this.state.artistdata.thumb_url }}
          style={{ width: 350, height: 350 }} />
        <FlatList
          data={this.state.artistevents}
          renderItem={({ item }) => <Text>{item.name}</Text>}
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
    marginTop: StatusBar.currentHeight
  },
  textview: {
    fontWeight: 'bold'
  }
});
