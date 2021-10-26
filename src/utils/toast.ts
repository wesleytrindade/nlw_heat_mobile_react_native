import React from 'react';
import { Platform, Alert, ToastAndroid } from 'react-native';

interface ToastProps {
    message: string;
    duration?: 'LONG' | 'SHORT';

}
export function showToast(message:string, duration:string = 'SHORT') {

    const toastDuration = duration === 'LONG' ? ToastAndroid.LONG : ToastAndroid.SHORT;

    if (Platform.OS === 'android') {
        ToastAndroid.show(message, toastDuration)
    }

    else {
        Alert.alert(message);
    }
}

