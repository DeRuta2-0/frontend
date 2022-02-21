import {Alert, StyleSheet, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Button} from "react-native-elements";
import {useEffect, useRef, useState} from "react";
import {serverIp, usingServer} from "../localProperties";
import { useIsFocused } from "@react-navigation/native";

export default function LoginScreen({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isFocused = useIsFocused();
    const usernameInput = useRef();
    const passwordInput = useRef();

    useEffect(() => {
        if (isFocused) {
            usernameInput.current.clear();
            passwordInput.current.clear();
        }
    }, [isFocused])

    const login = async () => {
        try {
            if (usingServer) {
                console.log("ip: " + serverIp);
                await fetch(
                    'http://'.concat(serverIp).concat(':8080/login'), {
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
                        navigation.navigate('MapScreen', {loggedUser: username});
                    } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                        Alert.alert("Login incorrecto");
                    }
                });
            } else {
                navigation.navigate('MapScreen', {loggedUser: username});
            }
        } catch (e) {
            console.log(e);
        }
    };

    return(<View style={styles.container}>
            <StatusBar style={styles.statusBar}
                       backgroundColor={greenColor}/>
            <TextInput
                ref={usernameInput}
                style={styles.textContainer}
                placeholder={"Usuario"}
                maxLength={15}
                underlineColorAndroid="transparent"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                ref={passwordInput}
                style={styles.textContainer}
                placeholder={"Contraseña"}
                maxLength={20}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={text => setPassword(text)}
            />
            <Button
                buttonStyle={styles.loginButton}
                titleStyle={styles.titleStyle}
                title="Ingresar"
                onPress={() => login()}/>
            <Button
                buttonStyle={styles.registerButton}
                titleStyle={styles.titleStyle}
                title="Registrarse"
                onPress={() => navigation.navigate('RegisterScreen')}/>
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
        borderColor: greenColor,
        borderRadius: 20
    },
    titleStyle: {
        fontSize: 23,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButton:{
        backgroundColor: greenColor,
        borderRadius: 20,
        width: 200,
        marginBottom: 30,
    },
    registerButton:{
        backgroundColor: blueColor,
        borderRadius: 20,
        width: 200,
        marginBottom: 30,
    },
    statusbar:{
        backgroundColor: greenColor
    }
});