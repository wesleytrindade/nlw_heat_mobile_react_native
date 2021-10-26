import React, { useState } from 'react';

import {
  Alert,
  Keyboard,
  Platform,
  TextInput,
  ToastAndroid,
  View
} from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { showToast } from '../../utils/toast';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormated = message.trim();

    if (!(messageFormated.length > 0)) {
      showToast("Preencha a mensagem", 'LONG');
      return;
    }

    await api.post('/messages', { message: messageFormated });
    
    setMessage('');
    Keyboard.dismiss();
    setSendingMessage(false);


    if(Platform.OS === 'android'){
      
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento?'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        value={message}
        editable={!sendingMessage}
        onChangeText={setMessage}
        style={styles.input} />

      <Button
        title='Enviar mensagem'
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessageSubmit}
        isLoading={sendingMessage}
      />
    </View>
  );
}