import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.text} placeholder={"Usuario"}></TextInput>
      <TextInput style={styles.text} placeholder={"Contraseña"}></TextInput>
      <StatusBar style="auto" />
      <Button titleStyle={styles.textButton} title="LOG IN"></Button>
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
