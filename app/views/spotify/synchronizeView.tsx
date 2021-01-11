import { Content, H1 } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SpotifyViewType } from '../spotifyView'
import { spotifyTheme } from '../theme'

export interface IProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
}

const SynchronizeView: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <>
            {
                props.selectedView === SpotifyViewType.Synchronize &&
                <ScrollView style={{ backgroundColor: spotifyTheme.secondaryColor }}>
                    <Content>
                        <H1>Synchronize Playlists</H1>
                    </Content>
                </ScrollView>
            }
        </>
    )
}

export default SynchronizeView