import React, { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function RegisterScreen({ navigation }) {
    const refer = firestore().collection('Users');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageurl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    const update = () => {
        var user = firebase.auth().currentUser;

        if (user != null) {
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);

            });
        }


    }

    const signout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const register = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((ref) => {
                firebase.auth().currentUser.updateProfile({


                    displayName: name,
                    photoUrl:
                        'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
                }).then((ref1) => {
                    update()
                    firestore().collection('Users').doc(firebase.auth().currentUser.uid).set({
                        displayName: name,
                        photoUrl: imageUrl,
                    }).then(() => {
                        console.log('User added!');
                    });
                    console.log('user data', JSON.stringify(ref1));
                });
                console.log('User account created & signed in!');
                console.log(name);
                console.log(imageUrl);
                console.log(ref);
                navigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.log(error);
            });

    }

    return (
        <View style={styles.container}>
            <StatusBar style='Light' />


            <Text h3 style={
                { marginBottom: 50 }
            } > Create a Signal Account </Text>
            <View style={styles.inputContainer}>
                <Input placeholder='Name'
                    type='text'
                    autoFocus onChangeText={
                        (text) => setName(text)
                    }
                    value={name}

                />




                <Input placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={
                        (text) => setEmail(text)
                    }
                />

                <Input placeholder='Password'
                    secureTextEntry type='password'
                    value={password}
                    onChangeText={
                        (text) => setPassword(text)
                    }
                />



                <Input placeholder='Profile Picture Url(OPtional)'
                    type='text'
                    onChangeText={
                        (text) => setImageurl(text)
                    }
                    value={imageUrl}

                />
            </View>
            <Button containerStyle={styles.button} raised onPress={register}
                title='Register' />
            <View style={
                { height: 100 }
            }
            />
            <Button containerStyle={styles.button}
                raised onPress={signout}
                title='Sign out' />
            <View style={
                { height: 100 }
            }
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,


    },
    inputContainer: {
        width: 300,

    },
});
