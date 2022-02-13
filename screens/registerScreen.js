import {Alert, StyleSheet, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Button} from "react-native-elements";
import {useState} from "react";
import {serverIp, usingServer} from "../localProperties";

export default function RegisterScreen({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            if (usingServer) {
                await fetch(
                    'http://'.concat(serverIp).concat(':8080/user'), {
                        method: 'post',
                        mode: 'no-cors',
                        headers: {
                            'Accept' : 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    }
                ).then(function(response) {
                    if (response.ok) {
                        navigation.navigate('LoginScreen');
                    } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                        Alert.alert("Registro incorrecto");
                    }
                });
            } else {
                navigation.navigate('LoginScreen');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return(<View style={styles.container}>
            <StatusBar style={styles.statusBar}
                       backgroundColor={greenColor}/>
            <TextInput
                style={styles.textContainer}
                placeholder={"Usuario"}
                maxLength={15}
                underlineColorAndroid="transparent"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={styles.textContainer}
                placeholder={"Contraseña"}
                maxLength={20}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={text => setPassword(text)}
            />
            <Button
                buttonStyle={styles.registerButton}
                titleStyle={styles.titleStyle}
                title="Registrarse"
                onPress={() => register()}/>
        </View>
    );
}

const greenColor = '#35CE8D';
const blueColor = '#0D98BA';

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
        borderColor: blueColor,
        borderRadius: 20
    },
    titleStyle: {
        fontSize: 23,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerButton:{
        backgroundColor: blueColor,
        borderRadius: 20,
        width: 200,
    },
    statusbar:{
        backgroundColor: greenColor
    }
});