import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { ISpotifyNavigationProps, SpotifyViewType } from '../spotifyView';
import PlaylistsView from './playlists/playlistsView';
import ArtistsView from './artists/artistsView';
import { StyleSheet } from 'react-native';

interface IProps extends ISpotifyNavigationProps { }

const SpotifyMenuView: React.FunctionComponent<IProps> = (props: IProps) => {

    return (
        <>
            {
                props.selectedView === SpotifyViewType.MENU &&
                <Content>
                    <View style={styles.containerStyle}>
                        <Button rounded success style={styles.buttonStyle} onPress={() => props.setSelectedView(SpotifyViewType.PLAYLISTS)}>
                            <Text>Playlists</Text>
                        </Button>
                        <Button rounded info style={styles.buttonStyle} onPress={() => props.setSelectedView(SpotifyViewType.ARTISTS)}>
                            <Text>Artists</Text>
                        </Button>
                    </View>
                </Content>
            }
            {
                props.selectedView !== SpotifyViewType.MENU &&
                <>
                    <PlaylistsView selectedView={props.selectedView} setSelectedView={props.setSelectedView} />
                    <ArtistsView selectedView={props.selectedView} setSelectedView={props.setSelectedView} />
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 50
    },
    buttonStyle: {
        margin: 10
    }
});

export default SpotifyMenuView;