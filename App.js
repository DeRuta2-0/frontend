import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const greenColor = '#35CE8D'

export default function App() {
  return (
    <View style={styles.container} >
      <StatusBar style={styles.statusBar} backgroundColor={greenColor} />
      <TextInput style={styles.textContainer} placeholder={"Usuario"} maxLength={15} underlineColorAndroid="transparent"></TextInput>
      <TextInput style={styles.textContainer} placeholder={"Contraseña"} maxLength={20} secureTextEntry={true} underlineColorAndroid="transparent"></TextInput>
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
    borderColor: greenColor,
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
    backgroundColor: greenColor,
    borderRadius: 20,
    width: 200,
  },
  statusbar:{
    backgroundColor: greenColor
  }
});