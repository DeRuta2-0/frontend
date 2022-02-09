import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.text} placeholder={"Usuario"} maxLength={15} textAlign='center'></TextInput>
      <TextInput secureTextEntry={true} style={styles.text} placeholder={"Contraseña"} maxLength={20} textAlign='center'></TextInput>
      <StatusBar style="auto" />
      <Button titleStyle={styles.textButton} title="LOG IN"></Button>
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
  text: {
    alignItems: 'center',
    fontSize: 25,
    marginBottom: 30
  },
  textButton: {
    fontSize: 25
  }
});
