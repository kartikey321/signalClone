import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';


export default function CustomListItem({ id, chatName, enterChat }) {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore().collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setChatMessages(snapshot.docs.map(doc => doc.data()))
        ));
        return unsubscribe;
    });

    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    // uri: chatMessages?.[0]?.photoUrl || 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
                    uri: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1}
                    ellipsizeMode='tail'>
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    );
};

const styles = StyleSheet.create({})
