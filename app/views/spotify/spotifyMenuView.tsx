import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { SpotifyViewType } from '../spotifyView';
import PlaylistsView from './playlistsView';
import ArtistsView from './artistsView';
import SynchronizeView from './synchronizeView';

interface IProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
}

export const SpotifyMenuView: React.FunctionComponent<IProps> = (props: IProps) => {

    return (
        <>
            {
                props.selectedView === SpotifyViewType.Menu &&
                <Content>
                    <View style={{ marginTop: 50 }}>
                        <Button rounded success style={{ margin: 10 }} onPress={() => props.setselectedView(SpotifyViewType.Playlists)}>
                            <Text>Playlists</Text>
                        </Button>
                        <Button rounded info style={{ margin: 10 }} onPress={() => props.setselectedView(SpotifyViewType.Artists)}>
                            <Text>Artists</Text>
                        </Button>
                        <Button rounded dark style={{ margin: 10 }} onPress={() => props.setselectedView(SpotifyViewType.Synchronize)}>
                            <Text>Synchronize</Text>
                        </Button>
                    </View>
                </Content>
            }
            {
                props.selectedView !== SpotifyViewType.Menu &&
                <>
                    <PlaylistsView selectedView={props.selectedView} setselectedView={props.setselectedView} />
                    <ArtistsView selectedView={props.selectedView} setselectedView={props.setselectedView} />
                    <SynchronizeView selectedView={props.selectedView} setselectedView={props.setselectedView} />
                </>
            }
        </>
    )
}
