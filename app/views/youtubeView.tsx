import { Body, Button, Header, Icon, Left, Right, Title } from "native-base";
import React, { useState } from "react";
import { youtubeTheme } from "./theme";
import { YoutubeMenuView } from "./youtube/youtubeMenuView";

interface Props { }

export enum YoutubeViewType {
    Menu,
    Playlists,
    Subscriptions,
    GeneratePlaylists
}

export const YoutubeView: React.FunctionComponent<Props> = () => {
    const [selectedView, setselectedView] = useState<YoutubeViewType>(YoutubeViewType.Menu)

    function _isSelectedView(view: YoutubeViewType) {
        return selectedView === view;
    }

    function _headerTitle() {
        if (_isSelectedView(YoutubeViewType.Subscriptions)) {
            return "Subscriptions";
        }
        if (_isSelectedView(YoutubeViewType.Playlists)) {
            return "Playlists";
        }
        if (_isSelectedView(YoutubeViewType.GeneratePlaylists)) {
            return "Generate playlists";
        }

        return 'Youtube';
    }

    function onBackButtonPressed() {
        setselectedView(YoutubeViewType.Menu);
    }

    return (
        <>
            <Header style={{ backgroundColor: youtubeTheme.primaryColor }} androidStatusBarColor={youtubeTheme.secondaryColor}>
                <Left>
                    {
                        !_isSelectedView(YoutubeViewType.Menu) &&
                        <Button transparent onPress={onBackButtonPressed}>
                            <Icon name='arrow-back' />
                        </Button>
                    }
                </Left>
                <Body>
                    <Title>{_headerTitle()}</Title>
                </Body>
                <Right />
            </Header>

            <YoutubeMenuView selectedView={selectedView} setselectedView={setselectedView} />
        </>
    )
}
