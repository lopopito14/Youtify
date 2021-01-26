import { Body, Button, Header, Icon, Left, Title } from "native-base";
import React from "react";
import { youtubeTheme } from "./theme";
import { YoutubeMenuView } from "./youtube/youtubeMenuView";

interface Props { }

export enum YoutubeViewType {
    MENU,
    PLAYLISTS,
    PLAYLIST,
    SUBSCRIPTIONS
}

export const YoutubeView: React.FunctionComponent<Props> = () => {
    const [selectedView, setselectedView] = React.useState<YoutubeViewType>(YoutubeViewType.MENU)

    function _isSelectedView(view: YoutubeViewType) {
        return selectedView === view;
    }

    function _headerTitle() {
        if (_isSelectedView(YoutubeViewType.SUBSCRIPTIONS)) {
            return "Subscriptions";
        }
        if (_isSelectedView(YoutubeViewType.PLAYLISTS)) {
            return "Playlists";
        }
        if (_isSelectedView(YoutubeViewType.PLAYLIST)) {
            return "Playlist";
        }

        return 'Youtube';
    }

    function _onBackButtonPressed() {
        if (selectedView === YoutubeViewType.PLAYLIST) {
            setselectedView(YoutubeViewType.PLAYLISTS);
        }
        else {
            setselectedView(YoutubeViewType.MENU);
        }
    }

    return (
        <>
            <Header style={{ backgroundColor: youtubeTheme.primaryColor }} androidStatusBarColor={youtubeTheme.secondaryColor}>
                <Left>
                    {
                        !_isSelectedView(YoutubeViewType.MENU) &&
                        <Button transparent onPress={_onBackButtonPressed}>
                            <Icon name='arrow-back' />
                        </Button>
                    }
                </Left>
                <Body>
                    <Title>{_headerTitle()}</Title>
                </Body>
            </Header>

            <YoutubeMenuView selectedView={selectedView} setselectedView={setselectedView} />
        </>
    )
}
