import { Body, CardItem, H3, Left } from 'native-base';
import React from 'react'
import { Text } from 'react-native'

interface Props {
    title: string;
    description: string;
}

const UserProfileItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <CardItem>
            <Left>
                <H3>{props.title}:</H3>
            </Left>
            <Body>
                <Text>{props.description}</Text>
            </Body>
        </CardItem>
    )
}

export default UserProfileItem;