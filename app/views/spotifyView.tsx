import React from 'react';
import { Body, Button, Header, Icon, Left, Title } from 'native-base';
import { StyleSheet } from 'react-native';
import { spotifyTheme } from './theme';
import SpotifyMenuView from './spotify/spotifyMenuView';
import { SpotifyViewType } from '../interfaces/spotifyInterfaces';

const SpotifyView: React.VoidFunctionComponent = () => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const [selectedView, setSelectedView] = React.useState<SpotifyViewType>(SpotifyViewType.MENU);

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const isSelectedView = React.useCallback((view: SpotifyViewType) => selectedView === view, [selectedView]);

    const onBackButtonPressed = React.useCallback(() => {
        if (isSelectedView(SpotifyViewType.ARTIST)) {
            setSelectedView(SpotifyViewType.ARTISTS);
        }
        else if (isSelectedView(SpotifyViewType.PLAYLIST)) {
            setSelectedView(SpotifyViewType.PLAYLISTS);
        }
        else {
            setSelectedView(SpotifyViewType.MENU);
        }
    }, [isSelectedView]);

    const headerTitle = () => {
        if (isSelectedView(SpotifyViewType.ARTISTS)) {
            return "Artists";
        }
        if (isSelectedView(SpotifyViewType.ARTIST)) {
            return "Artist";
        }
        if (isSelectedView(SpotifyViewType.PLAYLISTS)) {
            return "Playlists";
        }
        if (isSelectedView(SpotifyViewType.PLAYLIST)) {
            return "Playlist";
        }

        return 'Spotify';
    }

    return (
        <>
            <Header noShadow style={styles.headerStyle} androidStatusBarColor={spotifyTheme.secondaryColor}>
                <Left>
                    {
                        !isSelectedView(SpotifyViewType.MENU) &&
                        <Button transparent onPress={onBackButtonPressed}>
                            <Icon name='arrow-back' />
                        </Button>
                    }
                </Left>
                <Body>
                    <Title>{headerTitle()}</Title>
                </Body>
            </Header>

            <SpotifyMenuView selectedView={selectedView} setSelectedView={setSelectedView} />
        </>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: spotifyTheme.primaryColor
    }
});

export default SpotifyView;