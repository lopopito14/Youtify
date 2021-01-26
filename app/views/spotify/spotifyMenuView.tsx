import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { SpotifyViewType } from '../spotifyView';
import PlaylistsView from './playlistsView';
import ArtistsView from './artistsView';

interface IProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
}

export const SpotifyMenuView: React.FunctionComponent<IProps> = (props: IProps) => {

    return (
        <>
            {
                props.selectedView === SpotifyViewType.MENU &&
                <Content>
                    <View style={{ marginTop: 50 }}>
                        <Button rounded success style={{ margin: 10 }} onPress={() => props.setselectedView(SpotifyViewType.PLAYLISTS)}>
                            <Text>Playlists</Text>
                        </Button>
                        <Button rounded info style={{ margin: 10 }} onPress={() => props.setselectedView(SpotifyViewType.ARTISTS)}>
                            <Text>Artists</Text>
                        </Button>
                    </View>
                </Content>
            }
            {
                props.selectedView !== SpotifyViewType.MENU &&
                <>
                    <PlaylistsView selectedView={props.selectedView} setselectedView={props.setselectedView} />
                    <ArtistsView selectedView={props.selectedView} setselectedView={props.setselectedView} />
                </>
            }
        </>
    )
}
