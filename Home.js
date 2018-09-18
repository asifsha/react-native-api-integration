import React from 'react';
import {
    StatusBar, Button, TextInput, Image,
    FlatList, StyleSheet, Text, View, TouchableHighlight,
    Linking, ScrollView
} from 'react-native';


import ServiceApi from './ServiceApi';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Enter name to search artist',
            artistdata: '',
            artistevents: [],
            fontLoaded: false
        };
        this.searchartist = this.searchartist.bind(this);
    }

    // async componentWillMount() {
    //   await Expo.Font.loadAsync({
    //     'FontAwesome': require('./android/app/src/main/assets/fonts/fa-regular-400.ttf'),
    //   });
    //   this.setState({ fontLoaded: true });
    // }


    static navigationOptions = {
        title: 'Artist Search',
    };

    searchartist() {
        ServiceApi.getData(this.state.name).
            then((data) => this.setState({ artistdata: data }));
    }

    render() {
        const { navigate } = this.props.navigation;
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
                <ScrollView>
                    <Text>Results</Text>
                    <Text style={styles.textview}>{this.state.artistdata.name}</Text>
                    <Image source={{ uri: this.state.artistdata.thumb_url }}
                        style={{ width: 350, height: 350 }} />

                    <Text style={{ color: 'blue' }}
                        onPress={() => Linking.openURL(this.state.artistdata.facebook_page_url)}>
                        Facebook
        </Text>
                    <Text style={styles.subtitle}>Events</Text>
                    <FlatList
                        data={this.state.artistdata.eventsdata}
                        renderItem={({ item }) =>
                            <View>
                                <Text>{item.venue.name}</Text>
                                <Text>{item.venue.city + ' ' + item.venue.country}</Text>
                                <Button
                                    style={styles.button}
                                    title="View Location"
                                    onPress={() =>
                                        navigate('LocationMap', {
                                            venue: item.venue
                                        })
                                    }
                                />
                                <View
                                    style={styles.separator}
                                />
                            </View>
                        }
                        keyExtractor={(item, index) => item.id}

                    />
                </ScrollView>
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
    },
    button: {
        margin: 10, fontSize: 15, textAlign: 'left'
    },
    subtitle: {
        fontWeight: 'bold',
        color: '#990033'
    },
    separator: {
        height: 1,
        width: "92%",
        backgroundColor: "#CED0CE",
        marginLeft: "4%",
        marginRight: "4%"

    }
});
