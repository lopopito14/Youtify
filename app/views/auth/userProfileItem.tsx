import { Body, CardItem, H3, Left } from 'native-base';
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { settingsTheme } from '../theme';

interface Props {
    title: string;
    description: string;
}

const UserProfileItem: React.FunctionComponent<Props> = (props: Props) => {
    const { title, description } = props;

    return (
        <CardItem style={styles.cardItemStyle}>
            <Left>
                <H3>{title}:</H3>
            </Left>
            <Body>
                <Text>{description}</Text>
            </Body>
        </CardItem>
    )
}

const styles = StyleSheet.create({
    cardItemStyle: {
        backgroundColor: settingsTheme.secondaryBackgroundColor
    }
});

export default UserProfileItem;