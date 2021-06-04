import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import CustomListItem from '../components/CustomListItem';
import { useLayoutEffect } from 'react';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);
    const [img, setImg] = useState(null);


    const userimg = () => {
        firestore()
            .collection('Users').doc(firebase.auth().currentUser.uid)
            .get()
            .then(documentSnapshot => {

                if (documentSnapshot.exists) {
                    //console.log('data : ', documentSnapshot.data());
                    const { displayName, photoUrl } = documentSnapshot.data();
                    console.log(photoUrl);
                    setImg(photoUrl);

                }
            });

    }

    useEffect(() => {
        userimg();
        const unsubscribe = firestore().collection('chats').onSnapshot(snapshot =>
            setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        );
    }, []);





    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>

                    {/* <Avatar rounded source={{ uri: userimg() }} /> */}
                    <TouchableOpacity onPress={signout} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: img }} />
                    </TouchableOpacity>


                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 15,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon name="camera" size={24} color='black' />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <Icon name='pencil' size={24} color='black' />
                    </TouchableOpacity>

                </View>
            )
        });
    }, [navigation, img]);

    const signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.replace('Login');
            });
    }

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        });
    };
    return (

        <View>

            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName}
                        enterChat={enterChat} />

                ))}


            </ScrollView>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,


    },
    container: {
        height: '100%'
    }
})
