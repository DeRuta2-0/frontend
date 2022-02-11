import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { RefreshControl } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const greenColor = '#35CE8D'

let user = {
  username:"",
  password:""
};
let state = {
user: "Usuario",
password: "Contraseña"
}
let call2 = async function(){
    return true
}
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


function Login({ navigation }){
  return(<View style={styles.container}>
      <StatusBar style={styles.statusBar}
      backgroundColor={greenColor}/>
      <TextInput
          style={styles.textContainer}
          placeholder={state.user}
          maxLength={15}
          underlineColorAndroid="transparent"
          onChangeText={text => user.username=text}
          />
      <TextInput
          style={styles.textContainer}
          placeholder={"Contraseña"}
          maxLength={20}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => user.password=text}/>
        <Button
            buttonStyle={styles.button}
            titleStyle={styles.titleStyle}
            title="Ingresar"
            onPress={() => navigation.navigate('HomeScreen')}/>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const username = user.username
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Logueado correctamente</Text>
      <Text>Value:{username} </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  textContainer: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 23,
    height: 40,
    width: "50%",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: greenColor,
    borderRadius: 20
  },
  titleStyle: {
    fontSize: 23,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    backgroundColor: greenColor,
    borderRadius: 20,
    width: 200,
  },
  statusbar:{
    backgroundColor: greenColor
  }
});
