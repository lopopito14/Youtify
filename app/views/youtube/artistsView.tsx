import { Content, H1 } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native'

export interface IProps {
    backgroundColor: string;
}

const ArtistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <ScrollView style={{ backgroundColor: props.backgroundColor }}>
            <Content>
                <H1>Artists</H1>
            </Content>
        </ScrollView>
    )
}

export default ArtistsView
