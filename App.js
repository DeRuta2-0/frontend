import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { RefreshControl } from 'react-native-web';

const greenColor = '#35CE8D'

export default function App() {

    let user = {
        username:"",
        password:""
    };
    let state = {
      user: "Lalala",
      password: "Password"
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

  return (
    <View style={styles.container}>
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
            onPress={call}/>
    </View>
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
