import React from 'react';
import { MapView, Marker } from "expo";

export default class LocationMap extends React.Component {
    static navigationOptions = {
        title: 'Location Map'
    };

    render() {
        const { navigate } = this.props.navigation;
        // const latitude = navigate.getParam('latitude', 37.78825);
        // const longitude = navigate.getParam('longitude', -122.4324);
        const latitude = parseFloat(this.props.navigation.state.params.venue.latitude, 10);
        const longitude = parseFloat(this.props.navigation.state.params.venue.longitude, 10);       


        return (

            <MapView style={{
                flex: 1
            }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034

                }}
            >
                <MapView.Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={this.props.navigation.state.params.venue.region ==='' ? '' : this.props.navigation.state.params.venue.region
                      + ' ' + this.props.navigation.state.params.venue.city}
                    description={this.props.navigation.state.params.venue.country}
                />

            </MapView>

        );
    }
}