import React from 'react';
import {
    StatusBar, Image, FlatList,
    StyleSheet, Text, View, TouchableOpacity,
    Linking, ScrollView
} from 'react-native';
import {
    TextInput, Button, Headline, Subheading,
    List, Title, Divider
} from 'react-native-paper';



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

    static navigationOptions = {
        title: 'Artist Search',
    };

    searchartist() {
        ServiceApi.getData(this.state.name).
            then((data) => this.setState({ artistdata: data }));
    }

    displayArtistView() {
        
        if (this.state.artistdata == null || this.state.artistdata == '')
            return null;
        return <ScrollView contentContainerStyle={styles.scrollview}>
            <Subheading>Result</Subheading>
            <Title>{this.state.artistdata.name}</Title>
            <Image source={{ uri: this.state.artistdata.thumb_url }}
                style={{ width: 250, height: 250, padding: 1 }} />
            {this.displayFacebooklink()}
            <Headline>Events</Headline>
            <FlatList
                data={this.state.artistdata.eventsdata}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <Text style={styles.textview}>{item.venue.name}</Text>
                        <Text style={styles.textview}>{item.venue.city + ' ' + item.venue.country}</Text>
                        {this.displayMaplink(item)}
                        <Divider />
                    </View>
                }
                keyExtractor={(item, index) => item.id}

            />
        </ScrollView>
    }

    displayMaplink(item) {        
        const { navigate } = this.props.navigation;
        if (item.venue === null || item.venue === '' ||
            item.venue.latitude === null || item.venue.latitude === '' ||
            item.venue.longitude === null || item.venue.longitude === '' ||
            item.venue.hasOwnProperty('longitude') == false || 
            item.venue.hasOwnProperty('latitude') == false
        )
          return  <Text style={styles.noLocation}>Location Unavaliable</Text>

        return <Button
            style={{ width: 150, margin: 10 }}
            mode="outlined"
            onPress={() =>
                navigate('LocationMap', {
                    venue: item.venue
                })
            }
        >View Location</Button>
    }

    displayFacebooklink() {        
        if (this.state.artistdata.facebook_page_url === null || this.state.artistdata.facebook_page_url === '')
            return null;
        return
        <Button
            style={{ width: 150 }}
            icon="face" mode="contained" onPress={() => Linking.openURL(this.state.artistdata.facebook_page_url)}>
            Facebook
        </Button>
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ width: 250 }}
                    label="Artist name"
                    placeholder="Type here to search artist!"
                    onChangeText={(text) => this.setState({ name: text })}
                />
                <Button
                    onPress={this.searchartist}
                    mode="contained"
                    icon="search"
                >Search</Button>
                {this.displayArtistView()}
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    },
    scrollview: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textview: { textAlign: 'center' },
    button: {
        margin: 10, textAlign: 'center'
    },
    noLocation: {
        color : '#ad33ff'
    }
});
