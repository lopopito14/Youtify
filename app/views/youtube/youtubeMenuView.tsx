import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../interfaces/youtubeInterfaces';
import PlaylistsView from './playlists/playlistsView';
import SubscriptionsView from './subscriptions/subscriptionsView';
import AdjustFavoritesView from './adjustFavorites/adjustFavoritesView';

type IProps = IYoutubeNavigationProps

const YoutubeMenuView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { selectedView, setSelectedView } = props;

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const isSelected = React.useCallback((view: YoutubeViewType) => selectedView === view, [selectedView]);

    return (
        <>
            {
                isSelected(YoutubeViewType.MENU) ?
                    <Content>
                        <View style={styles.containerStyle}>
                            <Button rounded success style={styles.buttonStyle} onPress={() => setSelectedView(YoutubeViewType.PLAYLISTS)}>
                                <Text>Playlists</Text>
                            </Button>
                            <Button rounded info style={styles.buttonStyle} onPress={() => setSelectedView(YoutubeViewType.SUBSCRIPTIONS)}>
                                <Text>Subscriptions</Text>
                            </Button>
                            <Button rounded dark style={styles.buttonStyle} onPress={() => setSelectedView(YoutubeViewType.ADJUST_FAVORITES)}>
                                <Text>Adjust Favorites</Text>
                            </Button>
                        </View>
                    </Content>
                    :
                    <>
                        {
                            (isSelected(YoutubeViewType.PLAYLISTS) || isSelected(YoutubeViewType.PLAYLIST)) &&
                            <PlaylistsView selectedView={selectedView} setSelectedView={setSelectedView} />
                        }
                        {
                            (isSelected(YoutubeViewType.SUBSCRIPTIONS) || isSelected(YoutubeViewType.SUBSCRIPTION)) &&
                            <SubscriptionsView selectedView={selectedView} setSelectedView={setSelectedView} />
                        }
                        {
                            isSelected(YoutubeViewType.ADJUST_FAVORITES) &&
                            <AdjustFavoritesView selectedView={selectedView} setSelectedView={setSelectedView} />
                        }
                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 50
    },
    buttonStyle: {
        margin: 10
    }
});

export default YoutubeMenuView;