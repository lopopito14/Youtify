import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import PlaylistsView from './playlists/playlistsView';
import ArtistsView from './artists/artistsView';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../interfaces/spotifyInterfaces';

type IProps = ISpotifyNavigationProps

const SpotifyMenuView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { selectedView, setSelectedView } = props;

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const isSelected = React.useCallback((view: SpotifyViewType) => selectedView === view, [selectedView]);

    return (
        <>
            {
                isSelected(SpotifyViewType.MENU) &&
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
                !isSelected(SpotifyViewType.MENU) &&
                <>
                    {
                        (isSelected(SpotifyViewType.PLAYLISTS) || isSelected(SpotifyViewType.PLAYLIST)) &&
                        <PlaylistsView selectedView={selectedView} setSelectedView={setSelectedView} />
                    }
                    {
                        (isSelected(SpotifyViewType.ARTISTS) || isSelected(SpotifyViewType.ARTIST)) &&
                        <ArtistsView selectedView={selectedView} setSelectedView={setSelectedView} />
                    }
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