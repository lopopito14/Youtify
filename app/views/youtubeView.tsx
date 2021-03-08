import { Body, Button, Header, Icon, Left, Title } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { YoutubeViewType } from '../interfaces/youtubeInterfaces';
import { youtubeTheme } from './theme';
import YoutubeMenuView from './youtube/youtubeMenuView';

const YoutubeView: React.VoidFunctionComponent = () => {
    const [selectedView, setSelectedView] = React.useState<YoutubeViewType>(YoutubeViewType.MENU);

    const isSelectedView = (view: YoutubeViewType) => selectedView === view

    const headerTitle = () => {
        if (isSelectedView(YoutubeViewType.SUBSCRIPTIONS)) {
            return 'Subscriptions';
        }
        if (isSelectedView(YoutubeViewType.SUBSCRIPTION)) {
            return 'Subscription';
        }
        if (isSelectedView(YoutubeViewType.PLAYLISTS)) {
            return 'Playlists';
        }
        if (isSelectedView(YoutubeViewType.PLAYLIST)) {
            return 'Playlist';
        }
        if (isSelectedView(YoutubeViewType.ADJUST_FAVORITES)) {
            return 'Adjust Favorites'
        }

        return 'Youtube';
    }

    const onBackButtonPressed = React.useCallback(() => {
        if (selectedView === YoutubeViewType.PLAYLIST) {
            setSelectedView(YoutubeViewType.PLAYLISTS);
        } else if (selectedView === YoutubeViewType.SUBSCRIPTION) {
            setSelectedView(YoutubeViewType.SUBSCRIPTIONS);
        } else {
            setSelectedView(YoutubeViewType.MENU);
        }
    }, [selectedView, setSelectedView]);

    return (
        <>
            <Header style={styles.headerStyle} androidStatusBarColor={youtubeTheme.secondaryColor}>
                <Left>
                    {
                        !isSelectedView(YoutubeViewType.MENU) &&
                        <Button transparent onPress={onBackButtonPressed}>
                            <Icon name='arrow-back' />
                        </Button>
                    }
                </Left>
                <Body>
                    <Title>{headerTitle()}</Title>
                </Body>
            </Header>

            <YoutubeMenuView selectedView={selectedView} setSelectedView={setSelectedView} />
        </>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: youtubeTheme.primaryColor
    }
});

export default YoutubeView;