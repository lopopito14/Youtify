import React, { useState } from 'react';
import { Body, Button, Header, Icon, Left, Title } from 'native-base';
import { spotifyTheme } from './theme';
import { SpotifyMenuView } from './spotify/spotifyMenuView';

interface Props { }

export enum SpotifyViewType {
    Menu,
    Playlists,
    Playlist,
    Artists,
    Artist,
    Synchronize
}

export const SpotifyView: React.FunctionComponent<Props> = () => {
    const [selectedView, setselectedView] = useState<SpotifyViewType>(SpotifyViewType.Menu);

    function _isSelectedView(view: SpotifyViewType) {
        return selectedView === view;
    }

    function _headerTitle() {
        if (_isSelectedView(SpotifyViewType.Artists)) {
            return "Artists";
        }
        if (_isSelectedView(SpotifyViewType.Artist)) {
            return "Artist";
        }
        if (_isSelectedView(SpotifyViewType.Playlists)) {
            return "Playlists";
        }
        if (_isSelectedView(SpotifyViewType.Playlist)) {
            return "Playlist";
        }
        if (_isSelectedView(SpotifyViewType.Synchronize)) {
            return "Synchronize";
        }

        return 'Spotify';
    }

    function onBackButtonPressed() {
        if (selectedView === SpotifyViewType.Artist) {
            setselectedView(SpotifyViewType.Artists);
        }
        else if (selectedView === SpotifyViewType.Playlist) {
            setselectedView(SpotifyViewType.Playlists);
        }
        else {
            setselectedView(SpotifyViewType.Menu);
        }
    }

    return (
        <>
            <Header noShadow style={{ backgroundColor: spotifyTheme.primaryColor }} androidStatusBarColor={spotifyTheme.secondaryColor}>
                <Left>
                    {
                        !_isSelectedView(SpotifyViewType.Menu) &&
                        <Button transparent onPress={onBackButtonPressed}>
                            <Icon name='arrow-back' />
                        </Button>
                    }
                </Left>
                <Body>
                    <Title>{_headerTitle()}</Title>
                </Body>
            </Header>

            <SpotifyMenuView selectedView={selectedView} setselectedView={setselectedView} />
        </>
    )
}
