import React from 'react';

import { ScrollView, View } from 'react-native';
import { Message, MessageProps } from '../Message';

import { styles } from './styles';

const mockData:MessageProps = {
    id:'1',
    text:'Testando',
    user:{
        avatar_url:'https://github.com/wesleytrindade.png',
        name:'wesleytrindade'
    }   
};
export function MessageList() {
    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps='never'
        >
            <Message data={mockData} />
            
        </ScrollView>
    );
}