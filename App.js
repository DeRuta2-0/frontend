import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';

export default function App() {

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

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.textContainer}
          placeholder={"Usuario"}
          maxLength={15}
          underlineColorAndroid="transparent"
          onChangeText={text => user.username=text}/>
      <TextInput
          style={styles.textContainer}
          placeholder={"Contraseña"}
          maxLength={20}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => user.password=text}/>
      <StatusBar style={styles.button}/>
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
    borderColor:'#35CE8D',
    borderRadius: 20
  },
  titleStyle: {
    fontSize: 23,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    backgroundColor: '#35CE8D',
    borderRadius: 20,
    width: 200,
  }
});