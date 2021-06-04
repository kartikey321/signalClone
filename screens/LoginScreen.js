import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import auth, { firebase } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';


export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home');
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {
        console.log("email=",email);
        auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then((ref) => {
        console.log(ref);
        navigation.replace("Home");
    
        
        console.log('User sign in successful');
        })
        .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log(ref);
        }
    
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
    
        console.log(error);
        });

    }
    return (
        <KeyboardAvoidingView behavior= 'padding'
        style={styles.container}>
            <StatusBar style = 'Light' />
            <Image source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/600px-Signal-Logo.svg.png'

            }}
            style = {{width:200 , height:200}}/>
             <View style = { styles.inputContainer } >
        <Input placeholder = "Email"
        autoFocus type = 'email'
        value = { email }
        onChangeText = {
            (text) => setEmail(text)
        }
        />
        <Input placeholder = "Password"
        secureTextEntry type = 'password'
        value = { password }
        onChangeText = {
            (text) => setPassword(text)
        }
        />
        </View>

        <Button containerStyle = {styles.button}
        onPress = {signIn}
        title = "Login" />

        <Button onPress = {
            () => navigation.navigate('Register')
        }
        containerStyle = {styles.button}
        type= 'outline'
        title = 'Register' />
        <View style ={{height:100}} />

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});
