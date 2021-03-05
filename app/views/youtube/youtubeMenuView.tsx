import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { IYoutubeNavigationProps, YoutubeViewType } from '../youtubeView';
import PlaylistsView from './playlists/playlistsView';
import SubscriptionsView from './subscriptions/subscriptionsView';
import AdjustFavoritesView from './adjustFavorites/adjustFavoritesView';
import { StyleSheet } from 'react-native';

interface IProps extends IYoutubeNavigationProps { }

const YoutubeMenuView: React.FunctionComponent<IProps> = (props: IProps) => {

    return (
        <>
            {
                props.selectedView === YoutubeViewType.MENU &&
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
                props.selectedView !== YoutubeViewType.MENU &&
                <>
                    <PlaylistsView selectedView={props.selectedView} setSelectedView={props.setSelectedView} />
                    <SubscriptionsView selectedView={props.selectedView} setSelectedView={props.setSelectedView} />
                    <AdjustFavoritesView selectedView={props.selectedView} setSelectedView={props.setSelectedView} />
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