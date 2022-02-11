import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {LoginScreen} from './screens/loginScreen';
import {MapScreen} from './screens/mapScreen';

let user = {
  username:"",
  password:""
};

let call = async function() {
  try {
      await fetch(
          'http://192.168.0.251:8080/login', {
              method: 'post',
              mode: 'no-cors',
              headers: {
                  'Accept' : 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: user.username,
                  password: user.password
              })
          }
      )
  } catch (e) {
      console.log(e);
  }
};

const Stack = createNativeStackNavigator();
export default function App() {

return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
);
}


