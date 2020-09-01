import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import apiCall from '../../api/Api';
import Card from '../../components/UI/Card';

const movie = (props) => {
  const [data, setData] = useState('');
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    props
      .apiCall('https://reqres.in/api/users?page=2')
      .then(() => {
        const data = props.data;
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={props.data}
        numColumns={2}
        renderItem={({item}) => (
          <Card style={styles.product}>
            <View style={styles.touchable}>
              <TouchableOpacity onPress={props.onSelect} useForeground>
                <View>
                  <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: item.avatar}} />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.title}>
                      {item.first_name}
                      {''}
                      {item.last_name}
                    </Text>
                    <Text style={styles.title}>{item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const mapDispatchToProps = (dispatch) => ({
  apiCall: (url) => dispatch(apiCall(url)),
});

const mapStateToProps = (state) => ({
  data: state.apiReducer.data,
  error: state.apiReducer.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(movie);
const styles = StyleSheet.create({
  product: {
    height: 280,
    width: '45%',
    margin: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '80%',

    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    height: '17%',
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 13,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
});
