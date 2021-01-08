import { Button, Content, Icon, Text, View } from "native-base";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import ArtistsView from "./youtube/artistsView";
import GeneratePlaylistsView from "./youtube/generatePlaylistsView";
import PlaylistsView from "./youtube/playlistsView";

interface Props { }

enum YoutubeViewType {
    Menu,
    Playlists,
    Artists,
    GeneratePlaylists
}

export const YoutubeView: React.FunctionComponent<Props> = () => {
    const [selectedView, setselectedView] = useState<YoutubeViewType>(YoutubeViewType.Menu)

    function _isSelectedView(view: YoutubeViewType) {
        return selectedView === view;
    }

    return (
        <>
            {
                !_isSelectedView(YoutubeViewType.Menu) &&
                <View style={{ backgroundColor: "#ff000011" }}>
                    <Button rounded iconLeft onPress={() => setselectedView(YoutubeViewType.Menu)} style={{ marginStart: 20, marginTop: 20 }}>
                        <Icon name='arrow-back' />
                        <Text>Back</Text>
                    </Button>
                </View>
            }
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "#ff000011" }}>
                <Content>
                    {
                        _isSelectedView(YoutubeViewType.Menu) &&
                        <View style={{ marginTop: 50 }}>
                            <Button rounded danger style={{ margin: 10 }} onPress={() => setselectedView(YoutubeViewType.Playlists)}>
                                <Text>Playlists</Text>
                            </Button>
                            <Button rounded info style={{ margin: 10 }} onPress={() => setselectedView(YoutubeViewType.Artists)}>
                                <Text>Artists</Text>
                            </Button>
                            <Button rounded dark style={{ margin: 10 }} onPress={() => setselectedView(YoutubeViewType.GeneratePlaylists)}>
                                <Text>GeneratePlaylists</Text>
                            </Button>
                        </View>
                    }
                    {
                        _isSelectedView(YoutubeViewType.Playlists) && <PlaylistsView />
                    }
                    {
                        _isSelectedView(YoutubeViewType.Artists) && <ArtistsView />
                    }
                    {
                        _isSelectedView(YoutubeViewType.GeneratePlaylists) && <GeneratePlaylistsView />
                    }
                </Content>
            </ScrollView>
        </>
    )
}
