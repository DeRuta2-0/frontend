import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textContainer} placeholder={"Usuario"} maxLength={15} underlineColorAndroid="transparent"></TextInput>
      <TextInput style={styles.textContainer} placeholder={"Contraseña"} maxLength={20} secureTextEntry={true} underlineColorAndroid="transparent"></TextInput>
      <StatusBar style={styles.button} />
      <Button buttonStyle={styles.button} titleStyle={styles.titleStyle} title="Ingresar"></Button>
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
    justifyContent: 'center',
    textAlign:'center'
  },
  button:{
    backgroundColor: '#35CE8D',
    borderRadius: 20,
    width: 200,
  }
});