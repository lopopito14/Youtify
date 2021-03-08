import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import PlaylistsView from './playlists/playlistsView';
import ArtistsView from './artists/artistsView';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../interfaces/spotifyInterfaces';

type IProps = ISpotifyNavigationProps

const SpotifyMenuView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { selectedView, setSelectedView } = props;

    return (
        <>
            {
                selectedView === SpotifyViewType.MENU &&
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
                selectedView !== SpotifyViewType.MENU &&
                <>
                    <PlaylistsView selectedView={selectedView} setSelectedView={setSelectedView} />
                    <ArtistsView selectedView={selectedView} setSelectedView={setSelectedView} />
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