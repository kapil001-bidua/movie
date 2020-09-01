import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  Text,
  CheckBox,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import AsyncStorage from '@react-native-community/async-storage';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const STORAGE_KEY = '@save_age';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [checked, setChecked] = React.useState(true);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.test(formState.inputValues.email) == '') {
      setError(null);
      setIsLoading(true);
      console.log('akpo;');

      AsyncStorage.setItem(STORAGE_KEY, formState.inputValues.email);
    } else if (formState.inputValues.password.length < 6) {
      setError(null);
      setIsLoading(true);
      console.log('akpo;');

      AsyncStorage.setItem(STORAGE_KEY, formState.inputValues.password);
    } else {
      try {
        props.navigation.navigate('Movie');
        // Alert.alert('dsgkhnkzdv');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={10} style={styles.screen}>
      <View style={styles.gradient}>
        <View
          style={{
            width: '90%',
            maxWidth: 400,
            maxHeight: 400,

            marginTop: 20,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Welcome to live movies
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: Colors.light_gray,
              fontWeight: 'bold',
            }}>
            Let's get Started
          </Text>
        </View>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.green_color,
              }}>
              Login
            </Text>

            <Input
              id="email"
              label="Email"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="password"
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                tintColors={{true: Colors.green_color, false: 'black'}}
              />
              <Text style={styles.label}>
                I agree to Grocery's Terms of Services and Privacy Policy.
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}>
                <Text>Sign up</Text>
                <View
                  style={{width: '100%', height: 2, backgroundColor: 'black'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={authHandler}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: Colors.green_color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="md-arrow-round-forward"
                  size={25}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Card>
        <Text style={{marginTop: 20, fontSize: 15}}>OR</Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View
            style={{
              width: '20%',
              height: 1,
              backgroundColor: Colors.light_gray,
              justifyContent: 'center',
              margin: 10,
            }}
          />
          <Text style={{fontSize: 15}}>Login with social Account</Text>
          <View
            style={{
              width: '20%',
              height: 1,
              backgroundColor: Colors.light_gray,
              margin: 10,
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
    color: Colors.green_color,
  },
  label: {
    margin: 8,
    color: Colors.light_gray,
    fontSize: 13,
  },
});

export default AuthScreen;
