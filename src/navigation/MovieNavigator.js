import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screen/User/Login';
import Movie from '../screen/movie/movie';
import Colors from '../constants/Colors';
import StartupScreen from '../screen/StartupScreen';
import SignUp from '../screen/User/SignUp';
//Define a global color for toolbar
global.backgroundColor = '#176abf';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.green_color : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green_color,
};

const AuthNavigator = createStackNavigator(
  {
    Login: Login,
    Movie: Movie,
    SignUp: SignUp,
  },
  {
    headerMode: null,
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const MainNavigator = createSwitchNavigator({
  AuthNavigator: AuthNavigator,
  Startup: StartupScreen,
});

export default createAppContainer(MainNavigator);
