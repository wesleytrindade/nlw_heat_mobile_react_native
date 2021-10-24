import React from 'react';

import {
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import avatarImg from '../../assets/avatar.png'
import { COLORS } from '../../theme';

import { styles } from './styles';

interface UserPhotoProps {
    imageUri: string | undefined,
    size?: 'SMALL' | 'NORMAL'
}
const SIZES = {
    SMALL: {
        containerSize: 32,
        avatarSize: 28
    },

    NORMAL: {
        containerSize: 48,
        avatarSize: 46
    }
}

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({ imageUri, size = 'NORMAL' }: UserPhotoProps) {

    const { containerSize, avatarSize } = SIZES[size];

    return (
        <LinearGradient
            start={{ x: 0, y: 0.8 }}
            end={{ x: 0.9, y: 1 }}
            colors={[COLORS.PINK as string, COLORS.YELLOW]}
            style={[
                styles.container,
                {
                    width: containerSize,
                    height: containerSize,
                    borderRadius: avatarSize / 2
                }
            ]}
        >
            <Image
                source={{ uri: imageUri || AVATAR_DEFAULT }}
                style={[
                    styles.avatar,
                    {
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: avatarSize / 2
                    }]}
            />

        </LinearGradient>
    );
}