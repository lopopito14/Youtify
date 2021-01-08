import React, { useState } from 'react';
import { Button, Content, Icon, Text, View } from 'native-base';
import { ScrollView } from 'react-native';
import PlaylistsView from './spotify/playlistsView';
import ArtistsView from './spotify/artistsView';
import SynchronizeView from './spotify/synchronizeView';

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

    return (
        <>
            {
                !_isSelectedView(SpotifyViewType.Menu) &&
                <View style={{ backgroundColor: "#1DB95411" }}>
                    <Button rounded iconLeft onPress={() => setselectedView(SpotifyViewType.Menu)} style={{ marginStart: 20, marginTop: 20 }}>
                        <Icon name='arrow-back' />
                        <Text>Back</Text>
                    </Button>
                </View>
            }
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "#1DB95411" }}>
                <Content>
                    {
                        _isSelectedView(SpotifyViewType.Menu) &&
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
                    }
                    {
                        _isSelectedView(SpotifyViewType.Playlists) && <PlaylistsView />
                    }
                    {
                        _isSelectedView(SpotifyViewType.Artists) && <ArtistsView />
                    }
                    {
                        _isSelectedView(SpotifyViewType.Synchronize) && <SynchronizeView />
                    }
                </Content>
            </ScrollView>
        </>
    )
}
