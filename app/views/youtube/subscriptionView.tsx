import { Body, Card, CardItem, Content, H1, H2, Left, List, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import Context from '../../store/context';
import { youtubeTheme } from '../theme';
import { YoutubeViewType } from '../youtubeView';
import { Channel, Playlist, Subscription } from '../../youtubeApi/youtube-api-models';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { ChannelSections } from '../../youtubeApi/youtube-api-channelSections';
import { Subscriptions } from '../../youtubeApi/youtube-api-subscriptions';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import { Channels } from '../../youtubeApi/youtube-api-channels';

interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
    subscription: Subscription;
}

const SubscriptionView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [channelPlaylists, setChannelPlaylists] = React.useState<Playlist[]>([]);
    const [channelChannels, setChannelChannels] = React.useState<Channel[]>([]);
    const [channelSubscriptions, setChannelSubscriptions] = React.useState<Subscription[]>([]);

    React.useEffect(() => {
        _fetchAllChannelDatas();
    }, [props.subscription]);

    async function _fetchAllChannelDatas() {
        try {
            await Promise.all([_fetchChannelSections(), _fetchSubscriptions()]);
        } catch (error) {
            console.log('Error => ' + error);
        } finally {
            setLoaded(true);
        }
    }

    async function _fetchChannelSections() {
        try {
            var channelSectionsResponse = await new ChannelSections(state.youtubeState.credential.accessToken).list({
                channelId: props.subscription.snippet?.resourceId?.channelId ? props.subscription.snippet.resourceId.channelId : '',
                part: ['snippet', 'contentDetails']
            });
            if (channelSectionsResponse && channelSectionsResponse.items) {

                let playlistIds: string[] = [];
                let channelIds: string[] = [];

                channelSectionsResponse.items.forEach(i => {
                    if (i.contentDetails?.playlists) {
                        i.contentDetails.playlists.forEach(p => playlistIds.push(p))
                    } else if (i.contentDetails?.channels) {
                        i.contentDetails.channels.forEach(c => channelIds.push(c))
                    }
                });

                var playlistsResponse = await new Playlists(state.youtubeState.credential.accessToken).list({
                    id: playlistIds,
                    part: ['snippet', 'contentDetails'],
                    maxResults: 10,
                })
                if (playlistsResponse && playlistsResponse.items) {
                    setChannelPlaylists(playlistsResponse.items);
                }

                var channelsResponse = await new Channels(state.youtubeState.credential.accessToken).list({
                    id: channelIds,
                    part: ['snippet', 'contentDetails'],
                    maxResults: 10,
                })
                if (channelsResponse && channelsResponse.items) {
                    setChannelChannels(channelsResponse.items);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    async function _fetchSubscriptions() {
        try {
            var response = await new Subscriptions(state.youtubeState.credential.accessToken).list({
                channelId: props.subscription.snippet?.resourceId?.channelId ? props.subscription.snippet?.resourceId.channelId : '',
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
            });
            if (response && response.items) {
                setChannelSubscriptions(response.items);
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.SUBSCRIPTION &&
                <Content style={{ backgroundColor: youtubeTheme.secondaryColor }}>
                    {
                        loaded && channelPlaylists &&
                        (<Card style={{ margin: 5 }}>
                            <CardItem header style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H1>{props.subscription.snippet?.title}</H1>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                {
                                    props.subscription.snippet?.thumbnails?.high?.url &&
                                    <Thumbnail square source={{ uri: props.subscription.snippet?.thumbnails.high?.url }} style={{ height: 320, flex: 1 }} />
                                }
                            </CardItem>
                            <CardItem bordered>
                                <Text note>{props.subscription.snippet?.description}</Text>
                            </CardItem>
                            <CardItem style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H2>{`Playlists (${channelPlaylists.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    channelPlaylists.map((item, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Left>
                                                {
                                                    item.snippet?.thumbnails?.default?.url &&
                                                    <Thumbnail source={{ uri: item.snippet?.thumbnails?.default?.url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{item.snippet?.title}</Text>
                                                <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{item.snippet?.description}</Text>
                                            </Body>
                                            <Right>
                                                {/* <Button style={{ marginLeft: 20, borderColor: youtubeTheme.secondaryColor, borderWidth: 1 }} light color={youtubeTheme.secondaryColor} rounded icon>
                                                    <Icon android={item.id === trackIdPlaying ? "md-pause" : "md-play"} ios={item.id === trackIdPlaying ? "md-pause" : "md-play"} />
                                                </Button> */}
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                            <CardItem style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H2>{`Subscriptions (${channelSubscriptions.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    channelSubscriptions.map((s, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Left>
                                                {
                                                    s.snippet?.thumbnails?.default?.url &&
                                                    <Thumbnail source={{ uri: s.snippet?.thumbnails?.default?.url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{s.snippet?.title}</Text>
                                                <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{s.snippet?.description}</Text>
                                            </Body>
                                            <Right>
                                                {/* <Button style={{ marginLeft: 20, borderColor: youtubeTheme.secondaryColor, borderWidth: 1 }} light color={youtubeTheme.secondaryColor} rounded icon>
                                                    <Icon android={s.id === trackIdPlaying ? "md-pause" : "md-play"} ios={s.id === trackIdPlaying ? "md-pause" : "md-play"} />
                                                </Button> */}
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                            <CardItem style={{ backgroundColor: youtubeTheme.secondaryBackgroundColor }}>
                                <Body>
                                    <H2>{`Recommended (${channelChannels.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    channelChannels.map((c, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Left>
                                                {
                                                    c.snippet?.thumbnails?.default?.url &&
                                                    <Thumbnail source={{ uri: c.snippet?.thumbnails?.default?.url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text style={{ textAlignVertical: 'center' }} numberOfLines={1}>{c.snippet?.title}</Text>
                                                <Text note style={{ textAlignVertical: 'center' }} numberOfLines={1}>{c.snippet?.description}</Text>
                                            </Body>
                                            <Right>
                                                {/* <Button style={{ marginLeft: 20, borderColor: youtubeTheme.secondaryColor, borderWidth: 1 }} light color={youtubeTheme.secondaryColor} rounded icon>
                                                    <Icon android={c.id === trackIdPlaying ? "md-pause" : "md-play"} ios={c.id === trackIdPlaying ? "md-pause" : "md-play"} />
                                                </Button> */}
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Card>)
                    }
                    {
                        !loaded && <Spinner color={youtubeTheme.primaryColor} />
                    }
                </Content>
            }
        </>
    )
}

export default SubscriptionView
