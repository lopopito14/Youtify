import { Content, H1 } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { youtubeTheme } from '../theme'
import { YoutubeViewType } from '../youtubeView'

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const GeneratePlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <ScrollView style={{ backgroundColor: youtubeTheme.secondaryColor }}>
            <Content>
                <H1>Generate Playlists</H1>
            </Content>
        </ScrollView>
    )
}

export default GeneratePlaylistsView
