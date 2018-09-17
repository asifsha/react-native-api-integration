import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';

import  HomeScreen from './Home';
import  LocationMap from './LocationMap';


const App = createStackNavigator({
  Home: { screen: HomeScreen },
  LocationMap: { screen: LocationMap },
});

export default App;



