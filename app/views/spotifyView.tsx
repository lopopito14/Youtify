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

    const isSelectedView = (view: SpotifyViewType) => {
        return selectedView === view;
    }

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

    const onBackButtonPressed = React.useCallback(() => {
        if (selectedView === SpotifyViewType.ARTIST) {
            setselectedView(SpotifyViewType.ARTISTS);
        }
        else if (selectedView === SpotifyViewType.PLAYLIST) {
            setselectedView(SpotifyViewType.PLAYLISTS);
        }
        else {
            setselectedView(SpotifyViewType.MENU);
        }
    }, []);

    return (
        <>
            <Header noShadow style={{ backgroundColor: spotifyTheme.primaryColor }} androidStatusBarColor={spotifyTheme.secondaryColor}>
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

            <SpotifyMenuView selectedView={selectedView} setselectedView={setselectedView} />
        </>
    )
}
