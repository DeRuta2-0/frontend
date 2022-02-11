import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {LoginScreen} from './screens/loginScreen';
import {MapScreen} from './screens/mapScreen';

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


