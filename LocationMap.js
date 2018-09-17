import React from 'react';
import { MapView, Marker } from "expo";
import { View } from 'react-native';



export default class LocationMap extends React.Component {
    static navigationOptions = {
        title: 'Location Map',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <MapView style={{
                    flex: 1
                }}
                    showsMyLocationButton={true}
                    showsUserLocation={true}>
                    <Marker
                        coordinate={{ latitude: 52.36, longitude: 4.88 }}
                        title={"Some Title"}
                        description={"Hello world"}
                    />
                </MapView>
            </View>
        );
    }
}