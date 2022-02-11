import {Dimensions, StyleSheet, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Button} from "react-native-elements";
import * as React from "react";

const greenColor = '#35CE8D';

let state = {
    user: "Usuario",
    password: "Contraseña"
};

export function LoginScreen({ navigation }){
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
                onPress={() => navigation.navigate('MapScreen')}/>
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