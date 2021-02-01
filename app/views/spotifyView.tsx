import React from 'react';
import { Body, Button, Header, Icon, Left, Title } from 'native-base';
import { spotifyTheme } from './theme';
import { SpotifyMenuView } from './spotify/spotifyMenuView';

interface IProps { }

export enum SpotifyViewType {
    MENU,
    PLAYLISTS,
    PLAYLIST,
    ARTISTS,
    ARTIST
}

export interface ISpotifyNavigationProps {
    selectedView: SpotifyViewType;
    setselectedView(view: SpotifyViewType): any;
}

export const SpotifyView: React.FunctionComponent<IProps> = () => {
    const [selectedView, setselectedView] = React.useState<SpotifyViewType>(SpotifyViewType.MENU);

    function _isSelectedView(view: SpotifyViewType) {
        return selectedView === view;
    }

    function _headerTitle() {
        if (_isSelectedView(SpotifyViewType.ARTISTS)) {
            return "Artists";
        }
        if (_isSelectedView(SpotifyViewType.ARTIST)) {
            return "Artist";
        }
        if (_isSelectedView(SpotifyViewType.PLAYLISTS)) {
            return "Playlists";
        }
        if (_isSelectedView(SpotifyViewType.PLAYLIST)) {
            return "Playlist";
        }

        return 'Spotify';
    }

    function _onBackButtonPressed() {
        if (selectedView === SpotifyViewType.ARTIST) {
            setselectedView(SpotifyViewType.ARTISTS);
        }
        else if (selectedView === SpotifyViewType.PLAYLIST) {
            setselectedView(SpotifyViewType.PLAYLISTS);
        }
        else {
            setselectedView(SpotifyViewType.MENU);
        }
    }

    return (
        <>
            <Header noShadow style={{ backgroundColor: spotifyTheme.primaryColor }} androidStatusBarColor={spotifyTheme.secondaryColor}>
                <Left>
                    {
                        !_isSelectedView(SpotifyViewType.MENU) &&
                        <Button transparent onPress={_onBackButtonPressed}>
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
