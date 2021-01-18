import React from 'react';
import { Button, Content, Text, View } from 'native-base';
import { YoutubeViewType } from '../youtubeView';
import PlaylistsView from './playlistsView';
import SubscriptionsView from './subscriptionsView';

interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

export const YoutubeMenuView: React.FunctionComponent<IProps> = (props: IProps) => {

    return (
        <>
            {
                props.selectedView === YoutubeViewType.Menu &&
                <Content>
                    <View style={{ marginTop: 50 }}>
                        <Button rounded success style={{ margin: 10 }} onPress={() => props.setselectedView(YoutubeViewType.Playlists)}>
                            <Text>Playlists</Text>
                        </Button>
                        <Button rounded info style={{ margin: 10 }} onPress={() => props.setselectedView(YoutubeViewType.Subscriptions)}>
                            <Text>Subscriptions</Text>
                        </Button>
                        <Button rounded dark style={{ margin: 10 }} onPress={() => { }}>
                            <Text>Adjust Favorites Playlist</Text>
                        </Button>
                    </View>
                </Content>
            }
            {
                props.selectedView !== YoutubeViewType.Menu &&
                <>
                    <PlaylistsView selectedView={props.selectedView} setselectedView={props.setselectedView} />
                    <SubscriptionsView selectedView={props.selectedView} setselectedView={props.setselectedView} />
                </>
            }
        </>
    )
}
