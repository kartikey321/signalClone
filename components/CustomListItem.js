import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default function CustomListItem({ id, chatName, enterChat }) {
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1}
                    ellipsizeMode='tail'>
                    ABC
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    );
};

const styles = StyleSheet.create({})
