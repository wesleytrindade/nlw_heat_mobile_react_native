import React from 'react';

import { View, Text } from 'react-native';
import { MotiView } from '@motify/components';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export interface MessageProps {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string
    }
}

interface Props {
    data:MessageProps
}

export function Message(props: Props) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{type:'timing', duration:700}}
            style={styles.container}>
            <Text style={styles.message}>
                {props.data.text}
            </Text>

            <View style={styles.footer}>
                <UserPhoto imageUri={props.data.user.avatar_url} size='SMALL' />
                <Text style={styles.userName}>
                    {props.data.user.name}
                </Text>
            </View>
        </MotiView>
    );
}