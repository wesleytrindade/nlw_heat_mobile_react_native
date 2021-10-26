import React, { useEffect, useState } from 'react';

import { Platform, ScrollView, ToastAndroid, View } from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';

import { io } from 'socket.io-client';

import { styles } from './styles';

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (newMessage) => {
    messagesQueue.push(newMessage);
});

export function MessageList() {

    useEffect(() => {
        setInterval(() => {
            if (messagesQueue.length > 0) {
                setCurrentMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1]
                ].filter(Boolean))

                messagesQueue.shift();
            }
        }, 3000)
    },[])
    const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const messagesResponse = await api.get<MessageProps[]>("/messages/getmessages");
                setCurrentMessages(messagesResponse.data);
            }
            catch (err) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(`Erro ao carregar as mensagens\n ${err.message}`, ToastAndroid.LONG);
                }
            }

        }
        fetchMessages();
    }, [])
    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps='never'
        >
            {currentMessages.map(currentMessage => {
                return <Message key={currentMessage.id} data={currentMessage} />
            })}


        </ScrollView>
    );
}