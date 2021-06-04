import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ListItem, Avatar } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';


export default function ChatScreen({ navigation, route }) {
    const [input, setInput] = useState('');


    const sendMessage = () => {
        Keyboard.dismiss();
        firestore().collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            // photoUrl: firebase.auth().currentUser.photoUrl
        })

        setInput('');



    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Avatar rounded source={{
                        uri: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
                    }} />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{
                    marginLeft: 10
                }}
                    onPress={navigation.goBack}>
                    <Icon name='arrowleft' size={24} color='white' />

                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
                }} >
                    <TouchableOpacity>
                        <Icon1 name='videocam' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon1 name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='Light' />
            <KeyboardAvoidingView
                // behavior='height'
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <>
                        <ScrollView>
                            {/* Chat goes here */}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={text => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder='Signal message'
                                style={styles.textInput} />

                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Icon1 name='send' size={24} color='#2B68E6' />

                            </TouchableOpacity>

                        </View>
                    </>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },
})
