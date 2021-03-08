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

    return (
        <>
            {
                selectedView === YoutubeViewType.MENU &&
                <Content>
                    <View style={styles.containerStyle}>
                        <Button rounded success style={styles.buttonStyle} onPress={() => props.setSelectedView(YoutubeViewType.PLAYLISTS)}>
                            <Text>Playlists</Text>
                        </Button>
                        <Button rounded info style={styles.buttonStyle} onPress={() => props.setSelectedView(YoutubeViewType.SUBSCRIPTIONS)}>
                            <Text>Subscriptions</Text>
                        </Button>
                        <Button rounded dark style={styles.buttonStyle} onPress={() => props.setSelectedView(YoutubeViewType.ADJUST_FAVORITES)}>
                            <Text>Adjust Favorites</Text>
                        </Button>
                    </View>
                </Content>
            }
            {
                selectedView !== YoutubeViewType.MENU &&
                <>
                    <PlaylistsView selectedView={selectedView} setSelectedView={setSelectedView} />
                    <SubscriptionsView selectedView={selectedView} setSelectedView={setSelectedView} />
                    <AdjustFavoritesView selectedView={selectedView} setSelectedView={setSelectedView} />
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