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
          style={styles.text}
          placeholder={"Usuario"}
          onChangeText={text => user.username=text} />
      <TextInput
          style={styles.text}
          placeholder={"Contraseña"}
          onChangeText={text => user.password=text} />
      <StatusBar style="auto" />
      <Button titleStyle={styles.textButton} title="LOG IN" onPress={call}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    marginBottom: 30
  },
  textButton: {
    fontSize: 25
  }
});
