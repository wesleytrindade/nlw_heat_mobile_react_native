import React from 'react';

import {
    View
} from 'react-native';
import { useAuth } from '../../hooks/auth';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';


export function SignInBox() {

    const { signIn,isSigning } = useAuth();
    return (
        <View style={styles.container}>
            <Button
                title='Entrar com o github'
                color={COLORS.BLACK_PRIMARY}
                backgroundColor={COLORS.YELLOW}
                onPress={signIn}
                icon="github"
                isLoading = {isSigning}

            />
        </View>
    );
}