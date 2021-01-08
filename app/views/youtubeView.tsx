import { Body, Button, Content, Header, Icon, Left, Right, Text, Title, View } from "native-base";
import React, { useState } from "react";
import { youtubeTheme } from "./theme";
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

    function _headerTitle() {
        if (_isSelectedView(YoutubeViewType.Artists)) {
            return "Artists";
        }
        if (_isSelectedView(YoutubeViewType.Playlists)) {
            return "Playlists";
        }
        if (_isSelectedView(YoutubeViewType.GeneratePlaylists)) {
            return "Generate playlists";
        }

        return 'Youtube';
    }

    return (
        <>
            <Header style={{ backgroundColor: youtubeTheme.primaryColor }} androidStatusBarColor={youtubeTheme.secondaryColor}>
                <Left>
                    {
                        !_isSelectedView(YoutubeViewType.Menu) &&
                        <Button transparent onPress={() => setselectedView(YoutubeViewType.Menu)}>
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
                _isSelectedView(YoutubeViewType.Menu) &&
                <Content>
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
                </Content>
            }
            {
                _isSelectedView(YoutubeViewType.Playlists) && <PlaylistsView backgroundColor={youtubeTheme.secondaryColor} />
            }
            {
                _isSelectedView(YoutubeViewType.Artists) && <ArtistsView backgroundColor={youtubeTheme.secondaryColor} />
            }
            {
                _isSelectedView(YoutubeViewType.GeneratePlaylists) && <GeneratePlaylistsView backgroundColor={youtubeTheme.secondaryColor} />
            }
        </>
    )
}
