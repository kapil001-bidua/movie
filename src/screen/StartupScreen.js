//Import React and Hooks we needed
import React from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('AuthNavigators');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{width: '75%', height: '50%'}}
          source={require('../assets/movie.jpg')}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
