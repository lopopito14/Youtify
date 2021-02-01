import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { ISpotifyNavigationProps, SpotifyViewType } from '../spotifyView';
import PlaylistsView from './playlists/playlistsView';
import ArtistsView from './artists/artistsView';

interface IProps extends ISpotifyNavigationProps { }

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
