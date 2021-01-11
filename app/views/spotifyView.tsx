import React, { useState } from 'react';
import { Body, Button, Content, Header, Icon, Left, Right, Text, Title, View } from 'native-base';
import PlaylistsView from './spotify/playlistsView';
import ArtistsView from './spotify/artistsView';
import SynchronizeView from './spotify/synchronizeView';
import { spotifyTheme } from './theme';

interface Props { }

enum SpotifyViewType {
    Menu,
    Playlists,
    Artists,
    Synchronize
}

export const SpotifyView: React.FunctionComponent<Props> = () => {
    const [selectedView, setselectedView] = useState<SpotifyViewType>(SpotifyViewType.Menu)

    function _isSelectedView(view: SpotifyViewType) {
        return selectedView === view;
    }

    function _headerTitle() {
        if (_isSelectedView(SpotifyViewType.Artists)) {
            return "Artists";
        }
        if (_isSelectedView(SpotifyViewType.Playlists)) {
            return "Playlists";
        }
        if (_isSelectedView(SpotifyViewType.Synchronize)) {
            return "Synchronize";
        }

        return 'Spotify';
    }

    return (
        <>
            <Header noShadow style={{ backgroundColor: spotifyTheme.primaryColor }} androidStatusBarColor={spotifyTheme.secondaryColor}>
                <Left>
                    {
                        !_isSelectedView(SpotifyViewType.Menu) &&
                        <Button transparent onPress={() => setselectedView(SpotifyViewType.Menu)}>
                            <Icon name='arrow-back' />
                        </Button>
                    }

                </Left>
                <Body>
                    <Title>{_headerTitle()}</Title>
                </Body>
                <Right />
            </Header>
            {
                _isSelectedView(SpotifyViewType.Menu) &&
                <Content>
                    <View style={{ marginTop: 50 }}>
                        <Button rounded success style={{ margin: 10 }} onPress={() => setselectedView(SpotifyViewType.Playlists)}>
                            <Text>Playlists</Text>
                        </Button>
                        <Button rounded info style={{ margin: 10 }} onPress={() => setselectedView(SpotifyViewType.Artists)}>
                            <Text>Artists</Text>
                        </Button>
                        <Button rounded dark style={{ margin: 10 }} onPress={() => setselectedView(SpotifyViewType.Synchronize)}>
                            <Text>Synchronize</Text>
                        </Button>
                    </View>
                </Content>
            }
            {
                _isSelectedView(SpotifyViewType.Playlists) && <PlaylistsView backgroundColor={spotifyTheme.secondaryColor} />
            }
            {
                _isSelectedView(SpotifyViewType.Artists) && <ArtistsView backgroundColor={spotifyTheme.secondaryColor} />
            }
            {
                _isSelectedView(SpotifyViewType.Synchronize) && <SynchronizeView backgroundColor={spotifyTheme.secondaryColor} />
            }
        </>
    )
}
