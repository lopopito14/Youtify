import { Content, H1 } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export interface IProps {
    backgroundColor: string;
}

const GeneratePlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <ScrollView style={{ backgroundColor: props.backgroundColor }}>
            <Content>
                <H1>Generate Playlists</H1>
            </Content>
        </ScrollView>
    )
}

export default GeneratePlaylistsView
